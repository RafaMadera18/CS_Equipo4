import { Routes } from "@angular/router";

import { MenuPage } from "./menu.page";

export const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "bookings",
        loadComponent: () =>
          import("../bookings/bookings.page").then((m) => m.BookingsPage),
      },
      {
        path: "",
        redirectTo: "/menu/bookings",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/menu/bookings",
    pathMatch: "full",
  },
];
