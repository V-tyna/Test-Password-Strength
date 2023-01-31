import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public easy = false;
  public hard = false;
  public isHide = false;
  public isInvalid = false;
  public medium = false;
  public passwordCheckForm = new FormGroup({
    password: new FormControl(null, [
      Validators.minLength(8),
    ])
  });

  public cleanForm(): void {
    console.log('Cleaned!');
    this.passwordCheckForm.reset();
  }

  private isEasy(password: string): boolean {
    return new RegExp(/^([a-z]+|\d+)$/i).test(password) || !(new RegExp(/[A-Za-z0-9]/).test(password));
  }

  private isMedium(password: string): boolean {
    return new RegExp(/(?=.*[a-z])(?=.*[0-9])/i).test(password) ||  new RegExp(/(?=.*[a-z])(?=.*[^A-Za-z0-9])/i).test(password) ||  new RegExp(/(?=.*[0-9])(?=.*[^A-Za-z0-9])/i).test(password);
 }

 private isHard(password: string): boolean {
  return new RegExp(/(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/i).test(password);
}

  public handlePassword(): void {
    const password = <string | null>this.passwordCheckForm.controls.password.value;
    if (password && password.length >= 8) {
      this.easy = this.isEasy(password);
      this.medium = this.isMedium(password);
      this.hard = this.isHard(password);
    } else {
      this.easy = false;
      this.medium = false;
      this.hard = false;
    }
  }

  public toggle(): void {
    this.isHide = !this.isHide;
  }
}
