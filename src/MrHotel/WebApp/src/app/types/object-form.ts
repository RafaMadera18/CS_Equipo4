import { FormControl } from "@angular/forms";

export type ObjectForm<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
