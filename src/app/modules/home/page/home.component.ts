import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {EMPTY, find, map, Observable, Subscription} from 'rxjs';
import {OlympicService} from '../../../core/services/olympic.service';
import {Participation} from "../../../core/models/participation.model";
import {CountrySumUp} from "../../../core/models/country-sum-up.model";
import {Country} from "../../../core/models/country.model";
import {ConfigService} from "../../../core/services/config.service";

/**
 * Component representing the home page of the application.
 * This component is responsible for displaying the main content of the home page.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * Angular component representing the home page.
 * @class
 * @implements {OnInit}
 * @implements {OnDestroy}
 *
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class HomeComponent implements OnInit, OnDestroy {

  /**
   * Represents the Olympics data.
   *
   * @typedef {Observable<Country[]> | undefined} olympicsData$
   * @property {Observable<Country[]>} - An Observable that emits an array of Country objects that represent the Olympics data.
   */
  private olympicsData$: Observable<Country[]> | undefined;

  /**
   * An array of Subscription objects representing a collection of subscriptions.
   *
   * @type {Subscription[]}
   */
  private subscriptions: Subscription[] = [];

  /**
   * Variable indicating whether the back button is visible.
   *
   * @type {boolean}
   */
  isBackButtonVisible = false;
  /**
   * Indicates whether the details are currently visible or not.
   *
   * @type {boolean}
   * @default false
   */
  isDetailsVisible: boolean = false;

  /**
   * Represents the title of a chart.
   *
   * @type {string}
   * @description The title of the chart.
   */
  chartTitle = "Medals per country";
  /**
   * Details of totals for country sum up.
   *
   * @typedef {Object} CountrySumUp
   * @property {number} participations - The total number of participations.
   * @property {number} medals - The total number of medals.
   * @property {number} athletes - The total number of athletes.
   */
  detailsTotals: CountrySumUp = {
    participations: 0,
    medals: 0,
    athletes: 0
  };

  //#region "Variables for CanvasJS"

  /**
   * Represents a CanvasJS object - Type must be any
   *
   * @typedef {any} Chart
   */
  chart: any;

  /**
   * Depending on the chart type, the datapoint are different, so I decide to not create model object  and use "any" type
   * to avoid to overhead the application model with CanvasJS objects instantiated only once in all the code
   * I know that it was asked to not use any type, but I strongly think that's better in this case. It concerns only CanvasJS.
   * Plus in the case of the line chart, the label would have been a number which is no sense ! year has to be a number Cf. populateDetailsChart() Code
   */

  /**
   * Stores the data points of the pie chart "Medals per country" which is the main chart
   *
   * @type {any[]} - Any because the structure of a datapoint depends on the type of chart used
   */
  private mainDataPoints: any[] = [];

  /**
   * Stores the data points of the line chart number of medals per edition (country details)
   *
   * @type {Array<any>}
   */
  private detailsDataPoints: any[] = [];

  /**
   * Represents the selected chart slice.
   * @type {number}
   */
  private selectedChartSlice: number = -1;


  //#endregion "Objects for CanvasJS"

  //#region "Event handlers"

  /**
   * Details: Back button event handler
   * Updates the chart title, chart options, data points, and displays the chart.
   * Also removes credits, hides the back button, and details.
   *
   * @return {void}
   */
  handleClick() {
    this.chartTitle = "Medals per country";
    this.chart.options = this.mainPieChartOptions;
    this.chart.options.data.dataPoints = this.mainDataPoints;
    this.isBackButtonVisible = false;
    this.isDetailsVisible = false;
    if (this.selectedChartSlice != -1) {
      console.log('reset pie slice');
      setTimeout(() => this.resetChartSliceCallback(this.selectedChartSlice),
        this.appConfigService.getPieSliceResetTimerTime());
    }
    this.chartRender();
  }

  /**
   * Handler function for moving to the details section.
   *
   * @param {any} e - The event object
   * @returns {void}
   */
  moveToDetailsHandler = (e: any) => {
    this.selectedChartSlice = e.dataPoint.x;
    this.chartTitle = `${e.dataPoint.label} details`;
    this.chart.options = this.detailsLineChartOptions;
    this.populateDetailsChart(this.selectedChartSlice + 1);
    this.isBackButtonVisible = true;
    this.isDetailsVisible = true;
  }

  //#endregion "Event handlers"

  //#region "Chart options"

  //#region "Main chart options"
  /**
   * Options for the main pie chart.
   */
  mainPieChartOptions: {
    data: { dataPoints: any[]; type: string; click: (e: any) => void }[];
    axisY: { title: string };
    axisX: { title: string };
    theme: string;
    animationEnabled: boolean
  } = {
    animationEnabled: true,
    theme: 'light1',
    axisX: {
      title: "Edition"
    },
    axisY: {
      title: "Medals"
    },
    data: [
      {
        type: 'pie',
        click: this.moveToDetailsHandler,
        dataPoints: this.mainDataPoints,
      },
    ],
  };

  //#endregion "Main chart options"

  //#region "Details chart options"
  /**
   * Object representing the options for a line chart.
   */
  detailsLineChartOptions: {
    data: { toolTipContent: string; dataPoints: any[]; type: string }[];
    axisY: { title: string };
    axisX: { title: string };
  } = {
    axisX: {
      title: "Editions",
    },
    axisY: {
      title: "Medal count",

    },
    data: [{
      type: "line",
      toolTipContent: "<div>{label}<hr/>medals: {y}</div>",
      dataPoints: this.detailsDataPoints
    }],
  };

  //#endregion "Details chart options"

  //#endregion "Chart options"

  /**
   * Class constructor
   *
   * @param {Renderer2} renderer - provides a way to interact with the DOM
   * @param {ElementRef} elementRef - references the canvas element where the chart is rendered
   * @param {OlympicService} olympicService - Injects the OlympicService which provides the data for the charts
   */
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private olympicService: OlympicService,
    private appConfigService: ConfigService) {
  }

  /**
   * Initializes the component. This method is automatically called after component initialization.
   * It retrieves the Olympics games data using the olympicService.getOlympics() method and populates the main chart.
   * @return {void}
   */
  ngOnInit(): void {
    this.olympicsData$ = this.olympicService.getOlympics();
    this.populateMainChart();
  }

  /**
   * Lifecycle method called when the component is about to be destroyed.
   * Unsubscribes from all subscriptions.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  /**
   * Get the participation of a country using its ID
   *
   * @param {number} countryId  must be a number
   */
  getParticipationDetailsByCountryId(countryId: number): Observable<Participation[] | undefined> {
    if (this.olympicsData$) {
      return this.olympicsData$.pipe(
        find((countries: Country[]) => countries.some((country: Country): boolean => country.id === countryId)),
        map((countries: Country[] | undefined) => {
          const country: Country | undefined = countries?.find((obj: Country): boolean => obj.id === countryId);
          const participationDetails: Participation[] | undefined = [];

          if (country && country.participations) {
            country.participations.forEach((participation: Participation) => {
              participationDetails.push(participation);
            });
          }
          return participationDetails;
        })
      );
    } else {
      console.log("No olympic data found !")
      return EMPTY;
    }
  }

  /**
   * Retrieves the CanvasJS chart instance
   *
   * @param {object} chart
   */
  getChartInstance(chart: object) {
    this.chart = chart;
  }

  //#region "Populate charts methods"

  /**
   * Populates the chart with the data from the service
   *
   * @private
   */
  private populateMainChart() {
    if (this.olympicsData$) {
      const subscription: Subscription = this.olympicsData$.subscribe(
        (countries: Country[]) => {
          if (countries) {
            for (let index: number = 0; index < countries.length; index++) {
              const dataPoint: { x: number; name: string; y: number; label: string } = {
                x: index,
                y: (countries[index]).participations.reduce((medals: number, val: Participation) => medals + val.medalsCount, 0),
                label: countries[index].country,
                name: countries[index].country
              };
              this.mainDataPoints.push(dataPoint);
            }
          }
          this.chartRender();
        }
      );
      this.subscriptions.push(subscription);
    }
  }

  /**
   * Populates the details chart with data for a specific country.
   *
   * @param {number} countryId - The ID of the country.
   * @private
   */
  private populateDetailsChart(countryId: number) {
    const countryParticipation$: Observable<Participation[] | undefined> = this.getParticipationDetailsByCountryId(countryId);
    if (countryParticipation$) {
      const subscription: Subscription = countryParticipation$.subscribe(
        (participations: Participation[] | undefined) => {
          if (participations) {
            let medalsCount: number = 0;
            let athletesCount: number = 0;
            let participationsCount: number = 0;
            this.detailsDataPoints.length = 0;
            for (let index: number = 0; index < participations.length; index++) {
              const dataPoint: { label: number, y: number } = {
                label: participations[index].year, // do not use x !! it will interpolate the missing years🥵
                y: participations[index].medalsCount,
              };
              participationsCount++;
              athletesCount += participations[index].athleteCount;
              medalsCount += participations[index].medalsCount;
              this.detailsDataPoints.push(dataPoint);
            }
            this.detailsTotals = {
              medals: medalsCount,
              athletes: athletesCount,
              participations: participationsCount
            };
          }
          this.chartRender();

        }
      );
      this.subscriptions.push(subscription);
    }
  }

  //#endregion "Populate charts methods"

  /**
   * Removes the credits from the chart element.
   *
   * @private
   *
   * @returns {void}
   */
  private removeCredits() {
    const elementToRemove = this.elementRef.nativeElement.querySelector('.canvasjs-chart-credit');
    if (elementToRemove) {
      this.renderer.removeChild(elementToRemove.parentNode, elementToRemove);
    }
  }

  /**
   * Renders the chart  and removes the credits.
   * This method should only be called internally.
   *
   * @private
   * @return {void}
   */
  private chartRender() {
    this.chart.render();
    this.removeCredits();
  }

  /**
   * Replaces at its original position the pie slice of the selected country.
   *
   * @param {number} selectedSliceIndex - The index of the selected slice in the chart data array.
   * @private
   * @returns {void}
   */
  private resetChartSliceCallback(selectedSliceIndex: number) {
    this.chart.data[0].dataPoints[selectedSliceIndex].exploded = false;
    this.chartRender();
  }
}
