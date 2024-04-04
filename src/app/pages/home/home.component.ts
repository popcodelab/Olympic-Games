import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {EMPTY, find, map, Observable} from 'rxjs';
import {OlympicService} from '../../core/services/olympic.service';
import {ParticipationModel} from "../../core/models/participation.model";
import {OlympicsSumupModel} from "../../core/models/olympicsSumup.model";
import {Olympic} from "../../core/models/olympic.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/**
 * @author Pierre-Olivier Pignon
 */
export class HomeComponent implements OnInit {
  /** @Type {any[]} : Stores the datapoints of the pie chart "Medals per country" which is the main chart */
  private mainDataPoints: any[] = [];
  /** @Type {any[]} : Stores the datapoints of the line chart number of medals per edition (country details) */
  private detailsDataPoints: any[] = [];
  /** @Type {olympicsData$: Observable<Olympic[]> | undefined} : Olympic games data from the service */
  private olympicsData$: Observable<Olympic[]> | undefined;


  chart: any;
  /** @Type {boolean} : Back button on the detail chart */
   isBackButtonVisible = false;
   /** @Type {string} */
  chartTitle = "Medals per country";
  /** @Type {boolean} : Shows or hides the detail panel if the visitor is on the detail chart **/
  isDetailsVisible: boolean = false;
  /** @Type {OlympicsSumupModel} - Stores the totals of a country */
  detailsTotals: OlympicsSumupModel = {
    participations: 0,
    medals: 0,
    athletes: 0
  };

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

  /**
   * Get the participation of a country using its Id
   * @param {number} countryId  must be a number
   */
  getParticipationDetailsByCountryId(countryId: number): Observable<ParticipationModel[] | undefined> {
    if (this.olympicsData$) {
      return this.olympicsData$.pipe(
        find((olympics: Olympic[]) => olympics.some((olympic) => olympic.id === countryId)),
        map((olympics) => {
          const olympic: Olympic | undefined = olympics?.find((o) => o.id === countryId);
          const participationDetails: ParticipationModel[] | undefined = [];

          if (olympic && olympic.participations) {
            olympic.participations.forEach((participation: ParticipationModel ) => {
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
   * Options for the main pie chart.
   * @type {Object}
   * @property {boolean} animationEnabled - Specifies whether to enable animation for the chart.
   * @property {Object} title - The title configuration options for the chart.
   * @property {string} title.text - The title of the chart.
   * @property {string} theme - The theme for the chart.
   * @property {Object} axisX - The configuration options for the X-axis.
   * @property {string} axisX.title - The title of the X-axis.
   * @property {Object} axisY - The configuration options for the Y-axis.
   * @property {string} axisY.title - The title of the Y-axis.
   * @property {Array} data - The data configuration options for the chart.
   * @property {string} data.type - The type of chart.
   * @property {function} data.click - The click event handler for the chart.
   * @property {Array} data.dataPoints - The data points for the chart.
   */
  mainPieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Medals per Country'
    },
    theme: 'light1',
    axisX: {
      title: "Year"
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
   *
   * @typedef {Object} detailsLineChartOptions
   * @property {Object} title - The chart title options.
   * @property {string} title.text - The text of the chart title.
   * @property {Object} axisX - The X-axis options.
   * @property {string} axisX.title - The title of the X-axis.
   * @property {Object} axisY - The Y-axis options.
   * @property {string} axisY.title - The title of the Y-axis.
   * @property {Array} data - The data series options.
   * @property {string} data.type - The type of chart series (line).
   * @property {string} data.toolTipContent - The content of the tooltip for each data point.
   * @property {Array} data.dataPoints - The data points for the chart series.
   */
  detailsLineChartOptions = {
    title: {
      text: 'Medal count per year'
    },
    axisX: {
      title: "years",
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
   * Retrieves the CanvasJS chart instance
   * @param {object} chart
   */
  getChartInstance(chart: object) {
    this.chart = chart;
  }

  /**
   * Initializes the component. This method is automatically called after component initialization.
   * It retrieves the Olympics data using the olympicService.getOlympics() method and populates the main chart.
   * @return {void}
   */
  ngOnInit(): void {
    this.olympicsData$ = this.olympicService.getOlympics();
    this.populateMainChart();

  }

  /**
   * Populates the details chart with data for a specific country.
   *
   * @param {number} countryId - The ID of the country.
   * @private
   */
  private populateDetailsChart(countryId: number) {
    const countryParticipation$: Observable<ParticipationModel[] | undefined> = this.getParticipationDetailsByCountryId(countryId);
    if (countryParticipation$) {
      //this.chart.options=this.detailsLineChartOptions;
      countryParticipation$.subscribe(
        (participations) => {
          if (participations) {
            let medalsCount = 0;
            let athletesCount = 0;
            let participationsCount = 0;
            for (let index = 0; index < participations.length; index++) {
              const dataPoint = {
                label: participations[index].year, // do not use x !! it will interpolates the missing years🥵
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
        (olympics: Olympic[]) => {
          if (olympics) {

            for (let index = 0; index < olympics.length; index++) {
              const dataPoint = {
                x: index,
                y: (olympics[index]).participations.reduce((medals, val) => medals + val.medalsCount, 0),
                label: olympics[index].country,
                name: olympics[index].country
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
