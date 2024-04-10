import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/services/config.service";
import {environment} from "../../../environments/environment";

/**
 * Represents the HeaderComponent of the application.
 *
 * This component is responsible for displaying the header of the application,
 * including the application title.
 *
 * @class HeaderComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
/**
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class HeaderComponent implements OnInit {

  /**
   * @typedef {string} applicationTitle
   *
   * @description
   * The application title is a string that represents the title of the application.
   * It can be used to display the title in the user interface or as a reference in the code.
   *
   * @example
   * let myAppTitle = 'My App';
   */
  applicationTitle: string = '';

  /**
   * Represents an array of navigation items.
   *
   * @typedef {Object} NavItem
   * @property {string} link - The URL link for the navigation item.
   * @property {string} title - The title or label of the navigation item.
   */
  navItems: ({ link: string; title: string })[] = [
    { link: '/dashboard/charts', title: 'Charts' },
    { link: '/about', title: 'About' }
  ];

  /**
   * Constructs a new instance of the class.
   * @param {ConfigService} appConfigService - The app configuration service.
   */
  constructor(private appConfigService: ConfigService) { }



  /**
   * Initializes the component and assigns the application title.
   *
   * @return {void}
   */
  ngOnInit(): void {
    this.applicationTitle = this.appConfigService.getApplicationTitle();
  }

}
