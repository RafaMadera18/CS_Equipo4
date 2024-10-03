import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { IonButton, IonImg, IonContent } from "@ionic/angular/standalone";

import { AuthBasePage } from "../auth.base.page";

import { AuthHeaderComponent } from "@components/auth-header/auth-header.component";

import { InputFieldComponent } from "@components/input-field";

import { AdminRegisterRequest } from "@services/auth";

import { FormObject, FormObjectGroup } from "@customTypes/.";

import * as PasswordConfirmation from "./password-confirmation";

interface AdminRegistrationForm extends AdminRegisterRequest {
  passwordConfirm: string;
}

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
  standalone: true,
  imports: [
    AuthHeaderComponent,
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
  ): FormObjectGroup<AdminRegistrationForm> {
    const authForm = builder.group<FormObject<AdminRegistrationForm>>(
      {
        userName: builder.control("", [Validators.required]),
        password: builder.control("", [Validators.required]),
        passwordConfirm: builder.control("", [Validators.required]),
        adminCode: builder.control("", [Validators.required]),
      },
      {
        validators: PasswordConfirmation.matchValidator(
          "password",
          "passwordConfirm",
        ),
      },
    );

    authForm.statusChanges.subscribe(() => {
      this.updateMismatchState(authForm);
    });

    return authForm;
  }

  protected updateMismatchState(formGroup: FormGroup): void {
    const state = PasswordConfirmation.getMismatchState(
      formGroup,
      "password",
      "passwordConfirm",
      (id) => document.getElementById(id)!.querySelector(".native-input")!,
    );
    this.errorMessage.set(state);
  }

  protected override onSubmitValue(value: AdminRegistrationForm): void {
    this.errorMessage.set(null);

    this.authService.registerAdmin(value).subscribe({
      next: () => {
        this.router.navigate(["../login"]);
      },
      error: (response: HttpErrorResponse) => {
        const errorMessageValue =
          this.errorMessageProvider.formatErrorResponse(response);

        this.errorMessage.set(errorMessageValue);
      },
    });
  }
}
