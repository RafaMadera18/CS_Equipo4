import { inject } from "@angular/core";
import { CanActivateFn, Router, Routes } from "@angular/router";

import { map } from "rxjs";

import { AuthService, UserInfoResponse } from "@services/auth";
import { Nullable } from "@customTypes/nullable";

function notLoggedIn(): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.userInfo().pipe(
      map((userInfo: Nullable<UserInfoResponse>) => {
        console.log(userInfo);
        const loggedIn: boolean = userInfo != null;
        console.log(loggedIn);
        if (loggedIn) {
          router.navigate(["../menu"]);
        }

        return !loggedIn;
      }),
    );
  };
}

function requireAdminRegisterStatus(
  status: boolean,
  mismatchRedirect: string,
): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.adminRegisterStatus().pipe(
      map((currentStatus: boolean) => {
        const statusMatch: boolean = currentStatus === status;
        if (!statusMatch) {
          router.navigate([mismatchRedirect]);
        }

        return statusMatch;
      }),
    );
  };
}

export const routes: Routes = [
  {
    path: "auth",
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },
      {
        path: "login",
        loadComponent: () =>
          import("./login/login.page").then((m) => m.LoginPage),
        canActivate: [
          notLoggedIn(),
          requireAdminRegisterStatus(true, "auth/register"),
        ],
      },
      {
        path: "register",
        loadComponent: () =>
          import("./register/register.page").then((m) => m.RegisterPage),
        canActivate: [
          notLoggedIn(),
          requireAdminRegisterStatus(false, "auth/login"),
        ],
      },
    ],
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
];
