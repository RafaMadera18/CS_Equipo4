import { Routes } from "@angular/router";

import { MenuPage } from "./menu.page";

export const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "reservations",
        loadComponent: () =>
          import("../reservations/reservations.page").then((m) => m.ReservationsPage),
      },
      {
        path: "",
        redirectTo: "/menu/reservations",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/menu/reservations",
    pathMatch: "full",
  },
];
