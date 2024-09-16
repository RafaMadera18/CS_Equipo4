import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/auth/auth.routes").then((m) => m.routes),
  },
  {
    path: "menu",
    loadComponent: () =>
      import("./pages/menu/menu.page").then((m) => m.MenuPage),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
