import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "bookings",
    pathMatch: "full",
  },
  {
    path: "folder/:id",
    loadComponent: () =>
      import("./folder/folder.page").then((m) => m.FolderPage),
  },
  {
    path: "bookings",
    loadComponent: () =>
      import("./pages/bookings/bookings.page").then((m) => m.BookingsPage),
  },
];
