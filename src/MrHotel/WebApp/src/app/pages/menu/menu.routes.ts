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
          import("../rooms/rooms.page").then(
            (m) => m.RoomsPage,
          ),
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
