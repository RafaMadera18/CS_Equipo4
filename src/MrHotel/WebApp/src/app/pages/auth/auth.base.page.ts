import { Directive, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
} from "@angular/forms";

import { addIcons } from "ionicons";
import { personOutline, lockClosedOutline, keyOutline } from "ionicons/icons";

import { AuthService } from "@services/auth";

import { Maybe, Nullable, ObjectForm } from "@customTypes/.";
import { ErrorMessageProviderService } from "@services/error-message-provider/error-message-provider.service";

@Directive()
export abstract class AuthBasePage<TValue> implements OnInit {
  protected readonly authForm =
    signal<Nullable<FormGroup<ObjectForm<TValue>>>>(null);

  protected readonly errorMessage = signal<Nullable<string>>(null);

  constructor(
    protected readonly router: Router,
    protected readonly authService: AuthService,
    protected readonly errorMessageProvider: ErrorMessageProviderService,
  ) {
    addIcons({ personOutline, lockClosedOutline, keyOutline });
  }

  ngOnInit(): void {
    const builder = new FormBuilder().nonNullable;
    this.authForm.set(this.createAuthForm(builder));
  }

  protected abstract createAuthForm(
    builder: NonNullableFormBuilder,
  ): FormGroup<ObjectForm<TValue>>;

  protected getErrorMsg(controlName: string): Maybe<string> {
    const control: Nullable<AbstractControl> =
      this.authForm()!.get(controlName);

    if (!control) {
      throw new Error(`Control '${controlName}' not found.`);
    }

    if (!this.shouldValidateControl(control)) {
      return undefined;
    }

    // TODO: return this.errorMsgProviderService.getErrorMsg(control, controlName);
    return "Error";
  }

  protected shouldValidateControl(control: AbstractControl): boolean {
    return control.invalid && control.touched;
  }

  protected onSubmit(): void {
    this.onSubmitValue(this.authForm()!.getRawValue() as TValue);
  }

  protected abstract onSubmitValue(value: TValue): void;
}
