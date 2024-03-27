import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from '../../core/services/olympic.service';
import { Olympic } from "../../core/models/Olympic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'

})
export class HomeComponent implements OnInit {

  public olympicsData$: Observable<Olympic[]> | undefined;
  public chart: any;

  private chartData: Olympic[] = [];
  private labels: any[] = [];
  private medalsCount: any[] = [];
  private colors: any[] = [];

  private dataPoints: any[] = [];



  pieChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Medals per Country',
    },
    theme: 'light2', // "light1", "dark1", "dark2"
    axisX: {
      title: "Year"
    },
    axisY: {
      title: "Medals"
    },
    data: [
      {
        type: 'pie',
        click: function(e:any){
          alert(  e.dataSeries.type+ ", dataPoint { x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y + " } - index : " + e.dataSeries.index  );
        },
        dataPoints: this.dataPoints,
      },
    ],
  };

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private olympicService: OlympicService) {
  }
  ngOnInit(): void {
    this.olympicsData$ = this.olympicService.getOlympics();
    this.populateChart();

  }

  ngAfterViewInit(){
    this.removeCredits();
  }

  populateChart() {
    if (this.olympicsData$) {
      this.olympicsData$.subscribe(
        olympics => {
          this.chartData = olympics;
          if (olympics) {

            for (let index = 0; index < olympics.length; index++) {
              const dataPoint = {
                x: index,
                y: (this.chartData[index]).participations.reduce((medals, val) => medals + val.medalsCount, 0) ,
                label: this.chartData[index].country
              };
              this.dataPoints.push(dataPoint);
            }
          }
        }
      );
      // Add click event handler for data points
      this.chart.data[0].set("click", (e: any) => {
        console.log("Clicked on data point:", e.dataPoint.label);
        // Perform desired action here, such as navigating to a different page
      });
      this.chart.render();

    }
  }

  private removeCredits(){
    const elementToRemove = this.elementRef.nativeElement.querySelector('.canvasjs-chart-credit');
    if (elementToRemove) {
      this.renderer.removeChild(elementToRemove.parentNode, elementToRemove);
    }
  }
}
