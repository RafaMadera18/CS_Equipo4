import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/auth/auth.routes").then((m) => m.routes),
  },
  {
    path: "menu",
    loadChildren: () =>
      import("./pages/menu/menu.routes").then((m) => m.routes),
  },
  {
    path: "**",
    redirectTo: "",
  },  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },

];
