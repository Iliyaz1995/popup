import { AbstractControl } from "@angular/forms";

export function dropdownValidator(control: AbstractControl){
    if (typeof control.value === 'string' && control.value.length > 5){
        return {noMoreThan2000: true}
    }

    if(control.value === ""){
        return { optionNotSelected:true }
    } else if (control.value !== null){
        if (control.value.value == ''){
            return { optionNotSelected: true }        
        }
    } else if (control.value == null){
        return { optionNotSelected: true }
    } 
    
    return null;
}