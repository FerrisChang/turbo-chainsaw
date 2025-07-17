import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { city, comment, Condition, country, country_id, id_type, normal, zip_code } from './conditions';



@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})

export class ValidatorComponent {
  @Input() input : string = ""; 
  @Input() inputName: string = ""; 
  @Input() condition_type : string = "input-1"
  @Input() shiftLeft : boolean = false;
  @Input() normal : boolean = false;
  conditions : Condition [] = []; 
  errors : string [] = []; 
  @Output() sendError = new EventEmitter<string>();
  @Output() correctError = new EventEmitter<string>(); 
  constructor (private utils: UtilsService) {}
  ngOnInit () {
    // depending on the condition type, it will use those conditions 
    switch (this.condition_type) {
      case 'normal':
        this.conditions = normal; 
        break;
      case 'country_id': 
        this.conditions = country_id; 
        break; 
      case 'id_type': 
        this.conditions = id_type;
        break;  
      case 'city':
        this.conditions = city;
        break; 
      case 'zip_code': 
        this.conditions = zip_code; 
        break;
      case 'country':
        this.conditions = country;
        break;
      case 'comment': 
        this.conditions = comment;
        break;
    }
    this.validateInput(); 
  }
  ngOnChanges (changes : SimpleChanges) {
    if (changes['input']) {
      this.input = changes['input'].currentValue; 
      this.validateInput();
      Promise.resolve().then(()=>{
        if (this.errors.length>0) {
          this.sendError.emit(this.inputName)
        }
        else {
          this.correctError.emit(this.inputName); 
        }
      })
    }
  }
  validateInput () {
    this.errors = this.conditions.filter((condition)=>{
      switch (condition.type) {
        case 'length': 
          return this.input.length < condition.condition[0] || this.input.length > condition.condition[1]
        case 'company-id-pattern': 
          return !condition.condition.test(this.input); 
        case 'country-id':
          let sample_country = this.input.split("-")[0]; 
          return !(this.utils.translateCodeToCountry(sample_country).length > 2 && sample_country.length === 2)
        case 'company-id-type': 
          return !condition.condition.includes(this.input);
        case 'country': 
          //sees if the country is a valid country code
          return !(/[A-Z]{2}/.test(this.utils.translateCountryToCode(this.input)));
      }
      return true;
    }).map((condition)=>{
      switch (condition.type) {
        case 'length': 
          return `It does not have the length between ${condition.condition[0]} and ${condition.condition[1]}`
        case 'company-id-pattern': 
          return `Country ID needs to be the country code followed by the ID like this: US-0000`
        case 'country-id':
          return `'${this.input.split('-')[0]}' is not a valid country code.`
        case 'company-id-type': 
          return `Follow one of the following ID Types: [${condition.condition.join(',')}]`
        case 'country': 
          return `'${this.input}' is not a valid country.`
      }
      return `Did not follow this condition: ${condition}`
    })

    
  }
}

