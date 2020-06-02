import { Component, OnInit, ɵConsole } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-newdevice',
  templateUrl: './newdevice.component.html',
  styleUrls: ['./newdevice.component.css']
})
export class NewdeviceComponent implements OnInit {
  deviceId: String;
  location: String;
  description: String;
  image: ImageData;
  status: String;
  user = { id: 'test' };
  constructor(private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const Device = {
      deviceId: this.deviceId,
      location: this.location,
      description: this.description,
      image: this.image,
      status: this.status,
      addedBy: this.user.id
    };
  }
}
