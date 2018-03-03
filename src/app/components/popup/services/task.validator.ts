import { AbstractControl } from "@angular/forms";

export function dropdownValidator(control: AbstractControl){
    if(control.value === ""){
        return { optionNotSelected:true }
    }else if (control.value !== null){
        if(control.value.value === ""){
            return { optionNotSelected: true }        
        }
    }
    return null;
}