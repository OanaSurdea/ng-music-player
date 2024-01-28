import { NgIf } from '@angular/common';
import { Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {

  isLoading: InputSignal<boolean> = input.required();

}
