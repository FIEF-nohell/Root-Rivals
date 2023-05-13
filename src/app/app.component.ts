import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PlantService } from './services/plant.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private AuthService: AuthService, private plantService: PlantService) {
    this.AuthService.getUid();
    this.plantService.setStatus();
  }
}
