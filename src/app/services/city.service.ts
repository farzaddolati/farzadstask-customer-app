import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'https://localhost:44342/api/City';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  getCityById(id: number): Observable<City> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<City>(url);
  }

  addCity(customer: City): Observable<City> {
    return this.http.post<City>(this.apiUrl, customer);
  }

  updateCity(city: City): Observable<City> {
    const url = `${this.apiUrl}/${city.id}`;
    return this.http.put<City>(url, city);
  }

  deleteCity(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}