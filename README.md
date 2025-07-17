


export type Condition = {
  type: string, 
  condition: any
}
export let normal : Condition [] = [
  {
      type: 'length', 
      condition: [1,30]
  }
]
export let country_id : Condition [] = [
  {
      type: 'length', 
      condition: [1,50]
  },
  {
      type: 'company-id-pattern', 
      condition: /[A-Z]{2}-[A-Za-z0-9]/
  }, 
  {
      type: 'country-id', 
      condition: ''
  }
]
export let id_type : Condition [] = [
  {
      type: 'length', 
      condition: [1,30]
  },
  {
      type: 'company-id-type', 
      condition: ['TAX-ID']
  }
]
export let city : Condition [] = [
  {
      type: 'length', 
      condition: [1,20]
  }
]
export let zip_code : Condition [] = [
  {
      type: 'length', 
      condition: [1,10]
  }
]
export let country : Condition [] = [
  {
      type: 'length', 
      condition: [1,50]
  },
  {
      type: 'country', 
      condition: ''
  }
]
export let comment : Condition [] = [
  {
      type: 'length', 
      condition: [1,100]
  }
]










<div class="validation-container" *ngIf="input.length > 0">
  <mat-icon class="validator-icon" [class.red]="errors.length>0" [class.green]="errors.length===0">
    {{errors.length > 0 ? 'info-circle' : 'check'}}
  </mat-icon>
  <div [class.left]="shiftLeft" class="tooltip-container" *ngIf="errors.length>0">
      <div class="tooltip-header">
          {{inputName}}
      </div>
      <div class="tooltip-errors">
          <div class="error" *ngFor="let error of errors">
              {{error}}
          </div>
      </div>
  </div>
</div>













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
          return this.input.length > 0 && !condition.condition.test(this.input); 
        case 'country-id':
          if (this.input.length === 0) return true;
          let sample_country = this.input.split("-")[0]; 
          return !(this.utils.translateCodeToCountry(sample_country).length > 2 && sample_country.length === 2)
        case 'company-id-type': 
          return this.input.length > 0 && !condition.condition.includes(this.input);
        case 'country': 
          if (this.input.length === 0) return true;
          //sees if the country is a valid country code
          return !(/[A-Z]{2}/.test(this.utils.translateCountryToCode(this.input)));
      }
      return true;
    }).map((condition)=>{
      switch (condition.type) {
        case 'length': 
          if (this.input.length === 0) {
            return `This field is required and cannot be empty`
          }
          return `It does not have the length between ${condition.condition[0]} and ${condition.condition[1]}`
        case 'company-id-pattern': 
          return `Country ID needs to be the country code followed by the ID like this: US-0000`
        case 'country-id':
          if (this.input.length === 0) {
            return `This field is required and cannot be empty`
          }
          return `'${this.input.split('-')[0]}' is not a valid country code.`
        case 'company-id-type': 
          return `Follow one of the following ID Types: [${condition.condition.join(',')}]`
        case 'country': 
          if (this.input.length === 0) {
            return `This field is required and cannot be empty`
          }
          return `'${this.input}' is not a valid country.`
      }
      return `Did not follow this condition: ${condition}`
    })

    
  }
}

