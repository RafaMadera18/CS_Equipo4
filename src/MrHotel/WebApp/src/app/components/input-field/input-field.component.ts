import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from "@angular/forms";

import { IonInput, IonIcon, IonNote } from "@ionic/angular/standalone";

@Component({
  selector: "app-input-field",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
  standalone: true,
  imports: [IonInput, IonIcon, IonNote, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent {
  name = input("");
  type = input("");
  label = input("");
  placeholder = input("");
  icon = input("");
  errorMessage = input<string>();
  blur = output();
}
