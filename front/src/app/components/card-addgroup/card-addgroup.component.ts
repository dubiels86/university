import { analyzeAndValidateNgModules } from "@angular/compiler";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {  FormGroup } from "@angular/forms";
import { createPopper } from "@popperjs/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Car } from "../../../../model/car.entity";
import { FuelService } from "../../../../services/fuel.service";


@Component({
  selector: "app-card-addgroup",
  templateUrl: "./card-addgroup.component.html"
})
export class CardAddGroupComponent implements OnInit {

 
  toUpdate = false;
  carUpdateId = 0;
  carFilterId = 0;
  typevhs = [
    {id: 1, name: 'Camión Plancha'},
    {id: 2, name: 'Camión Furgón'},
    {id: 3, name: 'Omnibus'},
    {id: 4, name: 'Panel Sprinter'},
    {id: 5, name: 'Rastra'},
    {id: 6, name: 'Microbús'},
   
];
 
    car: Car = new Car();
    date: Date;
    selectedCar: number;
    cars: any[] = [];
    carsFilter: any[] = [];
    cc: any[] = [];

 
  constructor(private readonly _fuelService:FuelService,
              private toastr: ToastrService) {
  
  }

  ngOnInit(): void {
    
    this.loadCars();
  }

  trackBy(index:number, item:Car): number{
    return item.id;
  }

  selected(){
    this.selectedCar = this.selectedCar;
  }

  createCar() {
    this.car.type = this.selectedCar;
    this.car.mat = this.car.mat.toString();
    return this._fuelService.createCar(this.car).subscribe((res: any) => {
      this.loadCars();
      this.toastr.success(res.message, 'OK...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.car.mat = '';
      this.car.type = null;
      this.car.driver = '';
      this.car.ic = null;
      this.car.ci = '';
      this.car.capTanq = null;
      this.selectedCar = null;
      this.car.marca = ' ';
      this.car.model = ' ';
      this.toUpdate = false;
    });

  }

  showToaster(){
    this.toastr.success("Hello, I'm the toastr message.")
}
  removeCar(id:number) {
    
    let carDelete = this.cars[id];
    return this._fuelService.deleteCar(carDelete.id).subscribe((res: any) => {
      this.loadCars();
      
    });

  }

  updatedCar(carUpdateId){
    
    this.car.type = this.selectedCar;
    
      return this._fuelService.updateCar(carUpdateId, this.car).subscribe((res: any) => {
      this.loadCars();
      this.toastr.success(res.message, 'OK...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.car.mat = '';
      this.car.type = null;
      this.car.driver = '';
      this.car.ic = null;
      this.car.ci = '';
      this.car.capTanq = null;
      this.selectedCar =  null;
      this.car.marca = '';
      this.car.model = '';
      this.toUpdate = false;
      
    });
  }

  updateCar(id:number) {
    
    this.toUpdate = true;
    let carUpdate = this.cars[id];
    this.carUpdateId = carUpdate.id;
    this.car.mat = carUpdate.mat;
    this.selectedCar = carUpdate.type;
    this.car.driver = carUpdate.driver;
    this.car.ci = carUpdate.ci;
    this.car.ic = carUpdate.ic;
    this.car.capTanq = carUpdate.capTanq;
    this.car.marca = carUpdate.marca;
    this.car.model = carUpdate.model;
    

  }

  loadCars() {
    return this._fuelService.getCar().subscribe((res: any) => {
      this.cars = res;
      this.carsFilter = res;
      
    });
  }

  filterCar(){
    this.cars = [];
    this.cc = [];
    return this._fuelService.getCarById(this.carFilterId).subscribe((res: any) => {
      this.cc.push(res);
      this.cars = this.cc;
      
    });
  }

  

  
}
