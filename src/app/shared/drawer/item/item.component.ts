import { Component, Inject, inject, Input, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-drawer-item',
  imports: [RouterLink],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input({ required: true }) link!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) iconName!: string;

  private router = inject(Router)
  isClicked = false


  get isActiveRoute(): boolean {
    return this.router.url.endsWith(this.link)
  }

}
