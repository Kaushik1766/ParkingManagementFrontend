import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matTwoWheeler, matDirectionsCar } from '@ng-icons/material-icons/baseline';
import { SlotOverview } from '../../../models/slot';

@Component({
  selector: 'app-slot-overview',
  imports: [
    CommonModule,
    NgIconComponent
  ],
  providers: [provideIcons({ matTwoWheeler, matDirectionsCar })],
  templateUrl: './slot-overview.component.html',
  styleUrl: './slot-overview.component.scss'
})
export class SlotOverviewComponent {
  overview = input.required<SlotOverview>();
}
