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

  // isActive = false
  //
  // ngOnInit() {
  //   this.isActive = this.router.url.includes(this.link)
  //   this.router.events.subscribe({
  //     next: () => {
  //       this.isActive = this.router.url.includes(this.link)
  //     }
  //   })
  // }

  get isActiveRoute(): boolean {
    return this.router.url.includes(this.link)
  }

}
