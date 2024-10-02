import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";

import { Nullable } from "@customTypes/.";

export function matchValidator(
  controlName: string,
  matchingControlName: string,
): ValidatorFn {
  return (abstractControl: AbstractControl) => {
    const control = abstractControl.get(controlName);
    const matchingControl = abstractControl.get(matchingControlName);

    return !control?.value ||
      !matchingControl?.value ||
      control.value === matchingControl.value
      ? null
      : { mismatch: true };
  };
}

export function getMismatchState(
  formGroup: FormGroup,
  controlId: string,
  matchingControlId: string,
  inputElementSelector: (id: string) => Element,
): Nullable<string> {
  const errors: Nullable<ValidationErrors> = formGroup.errors;
  if (errors == null || !errors["mismatch"]) {
    return null;
  }

  const controlInput = inputElementSelector(controlId);
  const matchingControlInput = inputElementSelector(matchingControlId);

  return controlInput === document.activeElement ||
    matchingControlInput === document.activeElement
    ? null
    : "Password mismatch";
}
