import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matTwoWheeler, matDirectionsCar } from '@ng-icons/material-icons/baseline';
import { SlotResponse } from '../../../models/slot';
import { SlotCardComponent } from '../slot-card/slot-card.component';

@Component({
  selector: 'app-slot-map',
  imports: [
    CommonModule,
    NgIconComponent,
    SlotCardComponent
  ],
  providers: [provideIcons({ matTwoWheeler, matDirectionsCar })],
  templateUrl: './slot-map.component.html',
  styleUrl: './slot-map.component.scss'
})
export class SlotMapComponent {
  slots = input.required<SlotResponse[]>();
  isLoading = input<boolean>(false);
}
