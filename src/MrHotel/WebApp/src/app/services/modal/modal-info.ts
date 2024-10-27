import { Type } from "@angular/core";

import { BaseModalFormComponent } from "@components/modals/modal-base-form.component";

export interface ModalInfo<
  TTData,
  TComponent extends BaseModalFormComponent<TTData>,
> {
  readonly component: Type<TComponent>;
  readonly cssClass?: string;
}
