.tooltip-container {
    position: absolute; 
    visibility: collapse;
    padding: 0.5em;
    top: 90%; 
    left: 50%; 
    z-index: 99;
    transform: translateX(-150px);
    opacity: 0;
    transition: opacity ease 0.2s;
    text-align: center;
    background-color: rgb(48, 48, 48);
    color:white; 
    border-radius: 10px; 
    width: 20em;
}
.red.validator-icon {
    color: rgb(203 39 39);
}
.tooltip-container.left {
    transform: translateX(-270px);
}
.tooltip-header {
    font-weight: 550; 
    font-size: 1em; 
}
.error {
    font-size: 0.8em;
}
.validation-icon {
    margin-left: auto;
    margin-right: auto;
}
.validation-container:hover .tooltip-container {
    visibility: visible;
    opacity: 1;
}
.validation-container {
    margin-left: 1em;
    position: relative; 
    display: inline-block
}







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
        type: 'company-id-type', 
        condition: ['TAX-ID']
    },
    {
        type: 'length', 
        condition: [1,30]
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
