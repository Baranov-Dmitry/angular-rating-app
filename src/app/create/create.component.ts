import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Phone} from '../intefaces/interface';
import {PhonesService} from '../servises/phones.service';
import {MatDialogRef} from '@angular/material/dialog';
import {RATING_DEFAULT} from '../intefaces/consts';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private phonesService: PhonesService,
    private dialogRef: MatDialogRef<CreateComponent>) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      resolution: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      processor: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      camera: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      price: new FormControl(null, [
          Validators.required
        ]
      ),
    });
  }


  submit() {
    if (this.form.invalid) {
      return;
    }

    const phone: Phone = {
      name: this.form.value.name,
      resolution: this.form.value.resolution,
      processor: this.form.value.processor,
      camera: this.form.value.camera,
      price: this.form.value.price,
      rating: RATING_DEFAULT
    };
    console.log(phone);
    this.phonesService.create(phone).subscribe((response) => {
      this.form.reset();
      this.dialogRef.close(response);
    });
  }
}
