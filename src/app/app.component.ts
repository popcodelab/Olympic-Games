import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs';
import {OlympicService} from './core/services/olympic.service';
import {ConfigService} from "./core/services/config.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  applicationTitle: string = '';

  constructor(
    private appConfigService: ConfigService,
    private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.applicationTitle = this.appConfigService.getTitle();
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();
  }
}
