import { inject } from "@angular/core";
import { CanActivateFn, Router, Routes } from "@angular/router";

import { map } from "rxjs";

import { AuthService } from "@services/auth";

function requireAdminRegisterStatus(
  status: boolean,
  mismatchRedirect: string,
): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.adminRegisterStatus().pipe(
      map((currentStatus) => {
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
        canActivate: [requireAdminRegisterStatus(true, "auth/register")],
      },
      {
        path: "register",
        loadComponent: () =>
          import("./register/register.page").then((m) => m.RegisterPage),
        canActivate: [requireAdminRegisterStatus(false, "auth/login")],
      },
    ],
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
];
