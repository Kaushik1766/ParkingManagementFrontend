import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from "../../../shared/loader/loader.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from "primeng/floatlabel";
import { ButtonModule } from "primeng/button";
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-floors',
  imports: [CommonModule,
    LoaderComponent,
    ReactiveFormsModule,
    FloatLabel,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './floors.component.html',
  styleUrl: './floors.component.scss'
})
export class FloorsComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute)

  isLoading = false
  buildingId = ''
  isHovered = false

  floorFormGroup = new FormGroup({
    floorNumber: new FormControl(0, {
      validators: [
        Validators.min(0),
      ],
      updateOn: 'blur'
    })
  })

  ngOnInit() {
    this.activeRoute.params.subscribe(val => this.buildingId = val['buildingId'])
  }

  onAddFloor() {

  }

  get isFloorNumberInvalid() {
    return this.floorFormGroup.invalid && this.floorFormGroup.dirty
  }

}
