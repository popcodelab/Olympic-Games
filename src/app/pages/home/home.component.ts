import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {EMPTY, find, map, Observable} from 'rxjs';
import {OlympicService} from '../../core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";
import {OlympicsSumup} from "../../core/models/OlympicsSumup";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public olympicsData$: Observable<Olympic[]> | undefined;
  public chart: any;
  isButtonVisible = false;
  chartTitle = "Medals per country";
  isDetailsVisible: boolean = false;
  detailsTotals:OlympicsSumup  = {
    participations: 0,
    medals: 0,
    athletes: 0
  };

  private mainDataPoints: any[] = [];
  private detailsDataPoints: any[] = [];

  /*

 Details : Back button event handler
   */
  handleClick() {
    this.chartTitle = "Medals per country";
    this.chart.options = this.mainPieChartOptions;
    this.chart.options.data.dataPoints = this.mainDataPoints;
    this.chart.render();
    this.isButtonVisible = false;
    this.isDetailsVisible = false;

  }


  /*
  Chart : Pie slice click handler
   */
  moveToDetailsHandler = (e: any) => {
    this.chartTitle = `${e.dataPoint.label} details`;
    this.chart.options = this.detailsLineChartOptions;
    this.populateDetailsChart(e.dataPoint.x + 1);
    this.isButtonVisible = true;
    this.isDetailsVisible = true;
  }

  getParticipationDetailsByCountryId(countryId: number): Observable<Participation[] | undefined> {
    if (this.olympicsData$) {
      return this.olympicsData$.pipe(
        find((olympics: Olympic[]) => olympics.some((olympic) => olympic.id === countryId)),
        map((olympics) => {
          const olympic: Olympic | undefined = olympics?.find((o) => o.id === countryId);
          const participationDetails: Participation[] | undefined = [];

          if (olympic && olympic.participations) {
            olympic.participations.forEach((participation: Participation) => {
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

  /*
  Defines the pie chat options
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

  /*
  Populates line chart with participations data
   */
  private populateDetailsChart(countryId: number) {
    const countryParticipation$: Observable<Participation[] | undefined> = this.getParticipationDetailsByCountryId(countryId);
    if (countryParticipation$) {
      //this.chart.options=this.detailsLineChartOptions;
      countryParticipation$.subscribe(
        (participations) => {
          if (participations) {
            let medalsCount=0;
            let athletesCount = 0;
            let participationsCount = 0;
            for (let index = 0; index < participations.length; index++) {
              const dataPoint = {
                label: participations[index].year, // do not use x !! it will interpolates the missing years🥵
                y: participations[index].medalsCount,
              };
              participationsCount++;
              athletesCount+=participations[index].athleteCount;
              medalsCount+=participations[index].medalsCount;
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

  /*
Populates the chart with the data from the service
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


  constructor(
    private renderer: Renderer2, //  provides a way to interact with the DOM
    private elementRef: ElementRef, // the ElementRef references the canvas element where the chart is rendered
    private olympicService: OlympicService) { // Service injection
  }

  /*
 Gets the chart instance
  */
  getChartInstance(chart: object) {
    this.chart = chart;
  }

  /*
   Called once Angular has initialized all data-bound properties of a directive or component.
   */
  ngOnInit(): void {
    this.olympicsData$ = this.olympicService.getOlympics();
    this.populateMainChart();

  }

  /*
  Remove the CanvasJS credits ;)
   */
  private removeCredits() {
    const elementToRemove = this.elementRef.nativeElement.querySelector('.canvasjs-chart-credit');
    if (elementToRemove) {
      this.renderer.removeChild(elementToRemove.parentNode, elementToRemove);
    }
  }

}
