import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {name: null, username: null, email: null};

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    //Get profile information
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 10000});
      return false;
    });
  }

}
