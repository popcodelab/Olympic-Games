import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2,} from '@angular/core';
import {EMPTY, find, map, Observable, Subscription} from 'rxjs';
import {DataService} from '../../../core/services/data.service';
import {Participation} from "../../../core/models/participation.model";
import {SumUp} from "../../../core/models/sum-up.model";
import {Country} from "../../../core/models/country.model";
import {PieChartDataPoint} from "../../../core/types/pie-chart-datapoint.type";
import {ConfigService} from "../../../core/services/config.service";
import {LineChartDataPoint} from "../../../core/types/line-chart-datapoint.type";

/**
 * Component representing the chart's page of the application.
 * This component is responsible for displaying the main content of the chart's page.
 */
@Component({
  selector: 'app-chart',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

/**
 * Angular component representing the chart's page.
 * @class
 * @implements {OnInit}
 * @implements {OnDestroy}
 *
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export class ChartsComponent implements OnInit, OnDestroy, AfterViewInit {

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
  isBackButtonVisible: boolean = false;

  /**
   * Represents a sum up of athletes, jo count, and medals.
   * Its content depends on the displayed chart.
   *
   * @typedef {Object} SumUp
   * @property {number} athletes - The number of athletes.
   * @property {number} joCount - The jo count.
   * @property {number} medals - The number of medals.
   */
  sumUpToShowUp: SumUp =  {
    athletes:0,
    joCount: 0,
    medals: 0,
  };

  /**
   * Indicates whether to show the athlete count card or not.
   *
   * @type {boolean}
   * @default false
   */
  showAthleteCount: boolean = false;

  /**
   * Represents the title of a chart.
   *
   * @type {string}
   * @description The title of the chart.
   */
  chartTitle: string = "Medals per country";

  /**
   * Represents the pie chart totals of a sum up.
   *
   * @typedef {Object} SumUp
   * @property {number} joCount - The number of Joy of Officiating (Jo) events.
   * @property {number} medals - The number of medals awarded.
   * @property {number} athletes - The number of athletes involved - not displayed on the pie chart.
   */
  mainTotals: SumUp = {
    joCount: 0,
    medals : 0,
    athletes: 0
  };

  /**
   * Totals for a given country.
   *
   * @typedef {Object} SumUp
   * @property {number} joCount - The number of Joy of Officiating (Jo) events.
   * @property {number} medals - The number of medals awarded.
   * @property {number} athletes - The number of athletes involved.
   */
  detailsTotals: SumUp = {
    joCount: 0,
    medals: 0,
    athletes: 0
  };

  //#region "Variables for CanvasJS"

  /**
   * Represents a CanvasJS object - Type must be any
   *
   * @type {any} Chart
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
   * @typedef {PieChartDataPoint[]} - Array of PieChartDataPoint (Custom type)
   */
  private mainDataPoints: PieChartDataPoint[] = [];

  /**
   * Stores the data points of the line chart number of medals per edition (country details)
   *
   * @typedef {LineChartDataPoint[]} - Array LineChartDataPoint (Custom type)
   */
  private detailsDataPoints: LineChartDataPoint[] = [];

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
  handleClick() : void {
    this.chartTitle = "Medals per country";
    this.chart.options = this.mainPieChartOptions;
    this.chart.options.data.dataPoints = this.mainDataPoints;
    this.isBackButtonVisible = false;
    this.showAthleteCount = false;
    this.sumUpToShowUp = this.mainTotals;
    if (this.selectedChartSlice != -1) {
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
  moveToDetailsHandler = (e: any): void => {
    this.selectedChartSlice = e.dataPoint.x;
    this.chartTitle = `${e.dataPoint.label} details`;
    this.chart.options = this.detailsLineChartOptions;
    this.populateDetailsChart(this.selectedChartSlice + 1);
    this.isBackButtonVisible = true;
    this.showAthleteCount = true;
    this.sumUpToShowUp = this.detailsTotals;
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
    animationEnabled: boolean;
    toolTip: {
      animationEnabled: boolean;
      content: string,
      backgroundColor: string,
      cornerRadius: number;
      fontColor:string;
    }
  } = {
    toolTip:{
      content:"<div><p>{label}</p><span class=\"material-symbols-outlined\">license</span>{y}</div>",
      animationEnabled: true,
      backgroundColor:"#04838f",
      cornerRadius:5,
      fontColor:"white"
    },
    animationEnabled: false,
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
   * Creates a new instance of the constructor.
   *
   * @param {Renderer2} renderer - The renderer for manipulating elements.
   * @param {DataService} olympicService - The service for handling Olympic data.
   * @param {ConfigService} appConfigService - The service for retrieving application configuration.
   * @param {ChangeDetectorRef} cdr - The change detector reference for manual detection of changes.
   */
  constructor(
    private renderer: Renderer2,
    private olympicService: DataService,
    private appConfigService: ConfigService,
    private cdr: ChangeDetectorRef) {
  }

  //#region "Angular lifecycle"

  /**
   * Initializes the component. This method is automatically called after component initialization.
   * It retrieves the Olympics games data using the olympicService.getOlympics() method and populates the main chart.
   * @return {void}
   */
  ngOnInit(): void {
    this.olympicsData$ = this.olympicService.getOlympics();
  }

  /**
   * Executes after the component's view has been initialized.
   *
   * Called by Angular after the component's view and child views have been initialized.
   * Used to perform additional initialization tasks that require the view to be rendered like the chart rendering
   * Populates the chart and renders it.
   *
   * @return {void}
   */
  ngAfterViewInit(): void {
    this.populateMainChart();
    // For some reason, the change detector does not implicitly check the changes when navigating from another page.
    // So it doesn't refresh the Totals on the main chart title bar
    // detectChanges checks this view and its children.
    // It explicitly marks views as dirty, meaning that they have changed and need to be re-rendered.
    this.cdr.detectChanges();
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

  //#endregion "Angular lifecycle"

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
      console.warn("No olympic data found !")
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
      let countryCount: number = 0;
      let joCount: number[] = [];
      const subscription: Subscription = this.olympicsData$.subscribe(
        (countries: Country[]) => {
          if (countries) {
            for (let index: number = 0; index < countries.length; index++) {
              const dataPoint: PieChartDataPoint = {
                x: index,
                y: (countries[index]).participations.reduce((medals: number, val: Participation) => medals + val.medalsCount, 0),
                label: countries[index].country,
              };
              countryCount = index+1;
              this.mainDataPoints.push(dataPoint);
              // Calculate totals
              const countryParticipation$: Observable<Participation[] | undefined> = this.getParticipationDetailsByCountryId(index+1);
              if (countryParticipation$) {
                const subscriptionParticipations: Subscription = countryParticipation$.subscribe(
                  (participations: Participation[] | undefined) => {
                    if (participations) {
                      for (let index: number = 0; index < participations.length; index++) {
                        joCount.push(participations[index].year);
                      }
                    }
                  }
                );
                this.subscriptions.push(subscriptionParticipations)
              }
            }
            this.mainTotals = {
              medals: countryCount,
              joCount: [...new Set(joCount)].length,
              athletes:0
            };
            this.sumUpToShowUp = this.mainTotals;
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
              const dataPoint: LineChartDataPoint = {
                label: ""+participations[index].year, // do not use x !! it will interpolate the missing years🥵
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
              joCount: participationsCount
            };
            this.sumUpToShowUp = this.detailsTotals;
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
  private removeCredits(): void {
    const elementToRemove = this.renderer.selectRootElement('.canvasjs-chart-credit');
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
  private chartRender(): void {
    // in case the chart is not rendered yet
    try {
      this.chart.render();
      this.removeCredits();
    } catch (error) {
      console.warn(`chart renderer has occurred the following error ${error}`);
    }
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
