import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { ThemingService } from '../services/theming.service';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Message } from "primeng/message";
import { SelectModule } from 'primeng/select';
import { OfficeService } from '../services/office.service';
import { AuthService } from '../services/auth.service';
import { SignupRequest } from '../models/signup.api';
import { HttpErrorResponse } from '@angular/common/http';
import { signupErrors } from '../../config/signup';
import { COMMON_MESSAGES } from '../../config/common';
import { SIGNUP_MESSAGES } from '../../config/signup-messages';
import { Office } from '../models/office';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    ReactiveFormsModule,

    ToastModule,
    Button,
    InputTextModule,
    FloatLabelModule,
    Password,
    Message,
    SelectModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [MessageService]
})
export class SignupComponent implements OnInit {
  themingService = inject(ThemingService)
  private signupService = inject(AuthService)
  private officeService = inject(OfficeService)
  private destroyRef = inject(DestroyRef)
  private toastMessage = inject(MessageService)

  offices: Office[] = []
  isLoading = false

  signupForm = new FormGroup({
    userName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{4,10}$')
      ],
      updateOn: 'change'
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email
      ],
      updateOn: 'change'
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
      ],
      updateOn: 'change'
    }),
    office: new FormControl('', {
      validators: [
        Validators.required,
      ],
      updateOn: 'blur'
    })
  })

  ngOnInit(): void {
    const officeSub = this.officeService.getOffices().subscribe({
      next: resp => {
        this.offices = resp
      },
      error: e => {
        console.error(e)
      }
    })

    this.destroyRef.onDestroy(() => officeSub.unsubscribe())
  }

  signup() {
    console.log(this.signupForm)
    if (this.signupForm.valid) {
      this.isLoading = true;
      const userDetails: SignupRequest = {
        email: this.signupForm.controls.email.value!,
        name: this.signupForm.controls.userName.value!,
        officeId: this.signupForm.controls.office.value!,
        password: this.signupForm.controls.password.value!
      }
      const sub = this.signupService.signup(userDetails).subscribe({
        next: () => {
          this.isLoading = false;
          this.toastMessage.add({ severity: 'success', summary: COMMON_MESSAGES.TOAST.SUCCESS_SUMMARY, detail: SIGNUP_MESSAGES.TOAST.SUCCESS_CREATED });
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.isLoading = false;
          this.toastMessage.add({ severity: 'error', summary: COMMON_MESSAGES.TOAST.ERROR_SUMMARY, detail: err.error.message || SIGNUP_MESSAGES.TOAST.GENERIC_ERROR });
        }
      })

      this.destroyRef.onDestroy(() => sub.unsubscribe())
    }
  }

  get isEmailInvalid(): boolean {
    return this.signupForm.controls.email.invalid && this.signupForm.controls.email.dirty
  }

  get isUserNameValid(): boolean {
    return this.signupForm.controls.userName.invalid && this.signupForm.controls.userName.dirty
  }

  get isOfficeValid(): boolean {
    return this.signupForm.controls.office.invalid && this.signupForm.controls.office.dirty
  }

  get isPasswordValid(): boolean {
    return this.signupForm.controls.password.invalid && this.signupForm.controls.password.dirty
  }

  get getInvalidEmailMessage() {
    if (this.signupForm.controls.email.invalid && this.signupForm.controls.email.dirty) {
      return signupErrors.email
    }
    return ''
  }
  get getInvalidUsernameMessage() {
    if (this.signupForm.controls.userName.invalid && this.signupForm.controls.userName.dirty) {
      return signupErrors.userName
    }
    return ''
  }
  get getInvalidPasswordMessage() {
    if (this.signupForm.controls.password.invalid && this.signupForm.controls.password.dirty) {
      return signupErrors.password
    }
    return ''
  }
  get getInvalidOfficeMessage() {
    if (this.signupForm.controls.office.invalid && this.signupForm.controls.office.dirty) {
      return signupErrors.office
    }
    return ''
  }
}
