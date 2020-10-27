import { FormArray } from '@angular/forms';

export class FormValidation {
  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      /*const values = formArray.controls;
      let totalChecked = 0;
      for (let i = 0; i < values.length; i++) {
        if(values[i].value){
          totalChecked++;
        }
      }*/
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true };
    };

    return validator;
  }
}