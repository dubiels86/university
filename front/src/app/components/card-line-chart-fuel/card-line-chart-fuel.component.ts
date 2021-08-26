import { Component, OnInit, AfterViewInit } from "@angular/core";
import Chart from "chart.js";
import { map } from "rxjs/operators";
import { Fuel } from "src/app/model/fuel.entity";
import { FuelService } from "src/app/services/fuel.service";

@Component({
  selector: "app-card-line-chart-fuel",
  templateUrl: "./card-line-chart-fuel.component.html",
})
export class CardLineChartFuelComponent implements OnInit {

  fuels: Fuel[] = [];
  dataMonth: number[] = [];
  month: number = 0;
  constructor(private _fuelService: FuelService) {
    this._fuelService.getByMonths().subscribe((res:any[]) =>{
      res.map((i)=> {
        this.dataMonth.push(i);
      })
     
      
     })
  }

  ngOnInit() {
    this.countComb();
  }

  countComb(){

    this._fuelService.getByMonths().subscribe((res:any[]) =>{
     res.map((i)=> {
       this.dataMonth.push(i);
     })
     this.dataMonth = res;
     
    })
    
  }
  ngAfterViewInit() {
    
    var config = {
      type: "line",
      data: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
        ],
        datasets: [
          {
            label: "Combustible Abastecido",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [34,56,67],
            fill: false,
          },
          {
            label: "Combustible Consumido",
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: this.dataMonth,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx: any = document.getElementById("line-chart") as HTMLCanvasElement;
    ctx = ctx.getContext("2d");
    new Chart(ctx, config);
  }
}
