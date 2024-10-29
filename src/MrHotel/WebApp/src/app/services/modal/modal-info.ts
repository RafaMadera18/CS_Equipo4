import { Type } from "@angular/core";

import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";

export interface ModalInfo<
  Tinput,
  TOutput,
  TComponent extends BaseModalFormComponent<Tinput, TOutput>,
> {
  readonly component: Type<TComponent>;
  readonly cssClass?: string;
}
