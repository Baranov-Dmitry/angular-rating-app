import {Component, OnDestroy, OnInit} from '@angular/core';
import {Phone, Rating} from '../intefaces/interface';
import {PhonesService} from '../servises/phones.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateComponent} from '../create/create.component';
import {Subscription} from 'rxjs';
import {RATING_DEFAULT} from '../intefaces/consts';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-view-phone',
  templateUrl: './view-phone.component.html',
  styleUrls: ['./view-phone.component.scss']
})
export class ViewPhoneComponent implements OnInit, OnDestroy {
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Label[] = Object.keys(RATING_DEFAULT);
  // pieChartData: SingleDataSet = [24, 20, 40, 50];
  pieChartData: SingleDataSet;
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];

  phones: Phone[];
  pSub: Subscription;
  dSub: Subscription;
  uSub: Subscription;
  values: Rating;
  showChartPie = false;

  constructor(
    private phonesServices: PhonesService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.pSub = this.phonesServices.getPhones().subscribe(result => {
      this.phones = result;
      this.chartCalc();
    });
  }

  chartCalc(): void {
    this.values = {...RATING_DEFAULT};
    this.phones.forEach((item, i) => {
      Object.keys(item.rating).forEach(key => {
        this.values[key] = this.values[key] + item.rating[key];
      });
    });
    this.pieChartData = Object.values(this.values);
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.showChartPie = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.phones.push(result);
      }
    });
  }

  delete(id: string): void {
    this.dSub = this.phonesServices.delete(id).subscribe(() => {
      this.phones = this.phones.filter(phone => phone.id !== id);
      this.chartCalc();
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  stepUp(event, key, phone): void {
    if (phone.rating[key] < 10) {
      phone.rating[key]++;
    }
  }

  stepDown(event, key, phone): void {
    if (phone.rating[key] > 0) {
      phone.rating[key]--;
    }
  }

  update(event, phone: Phone): void {
    const target = event.currentTarget;
    target.disabled = true;
    this.uSub = this.phonesServices.update(phone).subscribe(() => {
      target.disabled = false;
      this.chartCalc();
      console.log('Rating was updated');
    });
  }
}
