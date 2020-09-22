import {Component, OnDestroy, OnInit} from '@angular/core';
import {Phone} from '../intefaces/interface';
import {PhonesService} from '../servises/phones.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateComponent} from '../create/create.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-view-phone',
  templateUrl: './view-phone.component.html',
  styleUrls: ['./view-phone.component.scss']
})
export class ViewPhoneComponent implements OnInit, OnDestroy {
  phones: Phone[];
  pSub: Subscription;
  dSub: Subscription;
  uSub: Subscription;

  constructor(
    private phonesServices: PhonesService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.pSub = this.phonesServices.getPhones().subscribe(result => {
      this.phones = result;
      console.log(this.phones);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.phones.push(result);
      }
    });
  }

  delete(id: string) {
    this.dSub = this.phonesServices.delete(id).subscribe(() => {
      this.phones = this.phones.filter(phone => phone.id !== id);
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

  stepUp(event, key, phone) {
    if (phone.rating[key] < 10) {
      phone.rating[key]++;
    }
  }

  stepDown(event, key, phone) {
    if (phone.rating[key] > 0) {
      phone.rating[key]--;
    }
  }

  update(event, phone: Phone) {
    const target = event.currentTarget;
    target.disabled = true;
    this.uSub = this.phonesServices.update(phone).subscribe(() => {
      target.disabled = false;
      console.log('Rating was updated');
    });
  }
}
