import { Component, input, output } from '@angular/core';
import { Building } from '../../../models/building';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-building-card',
  imports: [RouterLink],
  templateUrl: './building-card.component.html',
  styleUrl: './building-card.component.scss'
})
export class BuildingCardComponent {
  building = input.required<Building>()
}
