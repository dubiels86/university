import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Car } from '../model/car.entity';
import { Configuration } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class FuelService {
    
  APICAR = 'https://localhost:3001/api/cars';
  constructor(
    private httpClient: HttpClient,
  ) { }

  
  getCar() {
    return  this.httpClient.get(this.APICAR);
  }

  getCarById(id: number) {
    return  this.httpClient.get(`${this.APICAR}/${id}`);
  }

  createCar(car:Car) {
    debugger
    return this.httpClient.post(this.APICAR, car)
  }

  deleteCar(id:number) {
    return this.httpClient.delete(`${this.APICAR}/${id}`);
  }

  updateCar(id: string, car:Car) {
    return this.httpClient.patch(`${this.APICAR}/${id}`, car);
  }

  
}
