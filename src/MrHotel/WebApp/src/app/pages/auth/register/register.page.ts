import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { IonButton, IonImg, IonContent } from "@ionic/angular/standalone";

import { AuthBasePage } from "../auth.base.page";

import { InputFieldComponent } from "@components/input-field";

import { AdminRegisterRequest } from "@services/auth";

import { ObjectForm } from "@customTypes/.";

interface AdminRegistrationForm extends AdminRegisterRequest {
  passwordConfirm: string;
}

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
  standalone: true,
  imports: [
    InputFieldComponent,
    IonContent,
    IonImg,
    IonButton,
    ReactiveFormsModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage extends AuthBasePage<AdminRegistrationForm> {
  protected override createAuthForm(
    builder: NonNullableFormBuilder,
  ): FormGroup<ObjectForm<AdminRegistrationForm>> {
    const authForm = builder.group<ObjectForm<AdminRegistrationForm>>(
      {
        userName: builder.control("", [Validators.required]),
        password: builder.control("", [Validators.required]),
        passwordConfirm: builder.control("", [Validators.required]),
        adminCode: builder.control("", [Validators.required]),
      },
      {
        validators: this.passwordMatchValidator,
      },
    );

    authForm
      .get("password")!
      .valueChanges.subscribe(() => this.onValueChanges());
    authForm
      .get("passwordConfirm")!
      .valueChanges.subscribe(() => this.onValueChanges());

    return authForm;
  }

  protected passwordMatchValidator(formGroup: AbstractControl) {
    return formGroup.get("password")!.value ===
      formGroup.get("passwordConfirm")!.value
      ? null
      : { mismatch: true };
  }

  protected onValueChanges() {
    this.errorMessage.set(null);
    const errors: ValidationErrors | null = this.authForm()!.errors;
    if (errors == null) {
      return;
    }

    if (
      errors["mismatch"] &&
      this.haveValueAndAreNotSelected(["password", "passwordConfirm"])
    ) {
      this.errorMessage.set("Password mismatch");
    }
  }

  protected haveValueAndAreNotSelected(controlNames: string[]): boolean {
    return controlNames.every((name) => this.hasValueAndIsNotSelected(name));
  }

  protected hasValueAndIsNotSelected(controlName: string): boolean {
    const control: AbstractControl = this.authForm()!.get(controlName)!;
    const element: HTMLElement = document
      .getElementById(controlName)!
      .querySelector(".native-input")!;

    return control.value && element != document.activeElement;
  }

  protected override onSubmitValue(value: AdminRegistrationForm): void {
    this.errorMessage.set(null);

    this.authService.registerAdmin(value).subscribe({
      next: () => {
        this.router.navigate(["../login"]);
      },
      error: (error: HttpErrorResponse) => {
        // TODO
        this.errorMessage.set(error.message);
      },
    });
  }
}
