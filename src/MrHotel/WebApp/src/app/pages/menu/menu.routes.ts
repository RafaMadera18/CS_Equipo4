import { Routes } from "@angular/router";

import { MenuPage } from "./menu.page";

export const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "rooms",
        loadComponent: () =>
          import("../rooms/rooms.page").then((m) => m.RoomsPage),
      },
      {
        path: "guests",
        loadComponent: () =>
          import("../guests/guests.page").then((m) => m.GuestsPage),
      },
      {
        path: "inventory",
        loadComponent: () =>
          import("../inventory/inventory.page").then((m) => m.InventoryPage),
      },
      {
        path: "",
        redirectTo: "/menu/rooms",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/menu/rooms",
    pathMatch: "full",
  },
];
