import { Directive, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  NonNullableFormBuilder,
} from "@angular/forms";

import { addIcons } from "ionicons";
import { personOutline, lockClosedOutline, keyOutline } from "ionicons/icons";

import { AuthService } from "@services/auth";
import { ErrorMessageProviderService } from "@services/error-message-provider";

import { Nullable, FormObjectGroup } from "@customTypes/.";

@Directive()
export abstract class AuthBasePage<TValue> implements OnInit {
  protected readonly authForm = signal<Nullable<FormObjectGroup<TValue>>>(null);

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
  ): FormObjectGroup<TValue>;

  protected getErrorMsg(controlName: string): Nullable<string> {
    const control: Nullable<AbstractControl> =
      this.authForm()!.get(controlName);

    if (!control) {
      throw new Error(`Control '${controlName}' not found.`);
    }

    if (!this.shouldValidateControl(control)) {
      return null;
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
