import { Component, OnInit, ɵConsole } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    console.log('submitted');
    // Require all fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Fill all fields', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    // Require valid email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Invalid email', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }
  }
}
