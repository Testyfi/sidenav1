import { Component } from '@angular/core';
import { ProfilepictureupdateService } from '../profilepictureupdate.service';
@Component({
  selector: 'app-coupens',
  templateUrl: './coupens.component.html',
  styleUrls: ['./coupens.component.scss'],
})
export class CoupensComponent {
  constructor(public profile: ProfilepictureupdateService) {}
}
