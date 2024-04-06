import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {EMPTY, find, map, Observable} from 'rxjs';
import {OlympicService} from '../../core/services/olympic.service';
import {Participation} from "../../core/models/participation.model";
import {OlympicsSumUpModel} from "../../core/models/olympics-sum-up.model";
import {Country} from "../../core/models/country.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/**
 * @author Pignon Pierre-Olivier
 */
export class HomeComponent implements OnInit {

  /** @Type {olympicsData$: Observable<Country[]> | undefined} : Olympic games data from the service */
  private olympicsData$: Observable<Country[]> | undefined;

  /** @Type {boolean} : Back button on the detail chart */
  isBackButtonVisible = false;
  /** @Type {boolean} : Shows or hides the detail panel if the visitor is on the detail chart **/
  isDetailsVisible: boolean = false;

  /** @Type {string} */
  chartTitle = "Medals per country";
  /** @Type {OlympicsSumUpModel} - Stores the totals of a country */
  detailsTotals: OlympicsSumUpModel = {
    participations: 0,
    medals: 0,
    athletes: 0
  };

  //#region "Variables for CanvasJS"

  /**
   * Depending on the chart type, the datapoint are different, so I decide to not create model object  and use "any" type
   * to avoid to overhead the application model with CanvasJS objects instantiated only once in all the code
   * I know that it was asked to not use any type, but I strongly think that's better in this case. It concerns only CanvasJS.
   * Plus in the case of the line chart, the label would have been a number which is no sense ! year has to be a number Cf. populateDetailsChart() Code
   */
  /** @Type {any[]} : Stores the data points of the pie chart "Medals per country" which is the main chart */
  private mainDataPoints: any[] = [];
  /** @Type {any[]} : Stores the data points of the line chart number of medals per edition (country details) */
  private detailsDataPoints: any[] = [];
  /** @Type {any} : CanvasJS chart. Unknown type from TypeScript, so must be any */
  chart: any;

  //#endregion "Objects for CanvasJS"

  //#region "Event handlers"

  /**
   * Details : Back button event handler
   * Updates the chart title, chart options, data points, and displays the chart.
   * Also removes credits, hides the back button, and details.
   *
   * @return {void}
   */
  handleClick() {
    this.chartTitle = "Medals per country";
    this.chart.options = this.mainPieChartOptions;
    this.chart.options.data.dataPoints = this.mainDataPoints;
    this.chart.render();
    this.removeCredits();
    this.isBackButtonVisible = false;
    this.isDetailsVisible = false;
  }

  /**
   * Handler function for moving to details section.
   *
   * @param {any} e - The event object
   * @returns {void}
   */
  moveToDetailsHandler = (e: any) => {
    this.chartTitle = `${e.dataPoint.label} details`;
    this.chart.options = this.detailsLineChartOptions;
    this.populateDetailsChart(e.dataPoint.x + 1);
    this.isBackButtonVisible = true;
    this.isDetailsVisible = true;
  }

  //#endregion "Event handlers"

  //#region "Chart options"

  /**
   * Options for the main pie chart.
   */
  mainPieChartOptions: {
    data: { dataPoints: any[]; type: string; click: (e: any) => void }[];
    axisY: { title: string };
    axisX: { title: string };
    theme: string;
    title: { text: string };
    animationEnabled: boolean
  } = {
    animationEnabled: true,
    title: {
      text: 'Medals per Country'
    },
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

  /**
   * Object representing the options for a line chart.
   */
  detailsLineChartOptions: {
    data: { toolTipContent: string; dataPoints: any[]; type: string }[];
    axisY: { title: string };
    axisX: { title: string };
    title: { text: string }
  } = {
    title: {
      text: 'Medal count per edition'
    },
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

  //#endregion "Chart options"

  /**
   * Class constuctor
   * @param {Renderer2} renderer - provides a way to interact with the DOM
   * @param {ElementRef} elementRef - references the canvas element where the chart is rendered
   * @param {OlympicService} olympicService - Injects the OlympicService which provides the data for the charts
   */
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private olympicService: OlympicService) {
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
   * Get the participation of a country using its Id
   * @param {number} countryId  must be a number
   */
  getParticipationDetailsByCountryId(countryId: number): Observable<Participation[] | undefined> {
    if (this.olympicsData$) {
      return this.olympicsData$.pipe(
        find((countries: Country[]) => countries.some((country: Country):boolean => country.id === countryId)),
        map((countries: Country[] | undefined) => {
          const country: Country | undefined = countries?.find((obj:Country): boolean => obj.id === countryId);
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
   * @param {object} chart
   */
  getChartInstance(chart: object) {
    this.chart = chart;
  }

  //#region "Populate charts methods"

  /**
   * Populates the details chart with data for a specific country.
   *
   * @param {number} countryId - The ID of the country.
   * @private
   */
  private populateDetailsChart(countryId: number) {
    const countryParticipation$: Observable<Participation[] | undefined> = this.getParticipationDetailsByCountryId(countryId);
    if (countryParticipation$) {
      countryParticipation$.subscribe(
        (participations: Participation[] | undefined) => {
          if (participations) {
            let medalsCount: number = 0;
            let athletesCount: number = 0;
            let participationsCount: number = 0;
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
          this.chart.render();
          this.chart.title.remove();
          this.removeCredits();
        }
      );
    }
  }

  /**
   * Populates the chart with the data from the service
   *
   * @private
   */
  private populateMainChart() {
    if (this.olympicsData$) {
      this.olympicsData$.subscribe(
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
          this.chart.title.remove();
          this.chart.render();
          this.removeCredits();
        }
      );
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

}
