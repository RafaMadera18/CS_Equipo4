import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  NonNullableFormBuilder,
} from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { AuthHeaderComponent } from "@components/auth-header/auth-header.component";

import {
  IonButton,
  IonIcon,
  IonContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/angular/standalone";

import { InputFieldComponent } from "@components/input-field";

import { LoginRequest } from "@services/auth";

import { AuthBasePage } from "../auth.base.page";

import { ObjectForm } from "@customTypes/object-form";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  standalone: true,
  imports: [
    InputFieldComponent,
    AuthHeaderComponent,
    IonContent,
    IonImg,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    ReactiveFormsModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage extends AuthBasePage<LoginRequest> {
  protected override createAuthForm(
    builder: NonNullableFormBuilder,
  ): FormGroup<ObjectForm<LoginRequest>> {
    return builder.group({
      userName: builder.control("", [Validators.required]),
      password: builder.control("", [Validators.required]),
    });
  }

  protected override onSubmitValue(value: LoginRequest): void {
    this.errorMessage.set(null);

    this.authService.login(value).subscribe({
      next: () => {
        this.router.navigateByUrl("menu");
      },
      error: (response: HttpErrorResponse) => {
        const errorMessageValue =
          this.errorMessageProvider.formatErrorResponse(response);

        this.errorMessage.set(errorMessageValue);
      },
    });
  }
}
