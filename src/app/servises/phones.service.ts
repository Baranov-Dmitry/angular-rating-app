import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreateResponse, Phone} from '../intefaces/interface';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PhonesService {
  constructor(private http: HttpClient) {
  }

  create(phone: Phone): Observable<Phone> {
    return this.http.post(`${environment.fbDBUrl}/phones.json`, phone)
      .pipe(map((response: FbCreateResponse) => {
          return {
            ...phone,
            id: response.name,
          };
        })
      );
  }

  getPhones(): Observable<any> {
    return this.http.get(`${environment.fbDBUrl}/phones.json`)
      .pipe(map((response) => {
          return Object.keys(response).map(key => ({
              id: key,
              name: response[key].name,
              resolution: response[key].resolution,
              processor: response[key].processor,
              camera: response[key].camera,
              price: response[key].price,
              rating: {
                resolution: response[key].rating.resolution,
                processor: response[key].rating.processor,
                camera: response[key].rating.camera,
                price: response[key].rating.price,
              }
            })
          );
        })
      );
  }

  update(phone: Phone): Observable<Phone> {
    console.log(phone);
    return this.http.patch<Phone>(`${environment.fbDBUrl}/phones/${phone.id}.json`, phone);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.fbDBUrl}/phones/${id}.json`);
  }
}
