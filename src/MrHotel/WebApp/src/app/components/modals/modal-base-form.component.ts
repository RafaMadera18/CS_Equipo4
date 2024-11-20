import { Directive } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Directive()
export abstract class BaseModalFormComponent<Tinput, TOutput> {
  private _input!: Tinput;

  constructor(protected readonly _modalController: ModalController) {}

  public submitModal(output: TOutput): void {
    this._modalController.dismiss(output);
  }

  abstract onSubmit(): void

  public dismissModal(): void {
    this._modalController.dismiss(null);
  }

  public get input() {
    return this._input;
  }

  public set input(input: Tinput) {
    this._input = input;
  }
}
