import {Component, Input, OnInit} from '@angular/core';
import {ChartType, ChartOptions} from 'chart.js';
import {SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {
  @Input() values;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['resolution', 'processor', 'camera', 'price'];
  public pieChartData: SingleDataSet = [24, 20, 40, 50];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    console.log('chart values', this.values);
    // this.pieChartData = [this.values[0], this.values[1], this.values[2], this.values[3]];
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.pieChartData = [this.values.resolution, this.values.processor, this.values.camera, this.values.price];
    console.log('chart values', this.values.resolution);
    console.log('chart values', this.values);
  }

}
