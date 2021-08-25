import { analyzeAndValidateNgModules } from "@angular/compiler";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {  FormGroup } from "@angular/forms";
import { createPopper } from "@popperjs/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Group } from "src/app/model/group.entity";
import { UniversityService } from "src/app/services/university.service";



@Component({
  selector: "app-card-addgroup",
  templateUrl: "./card-addgroup.component.html"
})
export class CardAddGroupComponent implements OnInit {

 
  toUpdate = false;
  carUpdateId = 0;
  carFilterId = 0;
  teachers = [
    {id: 1, name: 'Angelica Ortiz'},
    {id: 2, name: 'Amelia Lopez'},
    {id: 3, name: 'Luis Fdez'},
    {id: 4, name: 'Plinio Perez'},
    {id: 5, name: 'Xenia Olivares'},     
];
  teacher: string;
 
    group: Group = new Group();
    groups: any[] = [];
    date: Date;
    
    
 
  constructor(private readonly _universityService:UniversityService,
              private toastr: ToastrService) {
  
  }

  ngOnInit(): void {
    
    this.loadGroups();
  }


  createGroup() {
    this.group.teacher = this.teacher;
    return this._universityService.createGroup(this.group).subscribe((res: any) => {
      this.loadGroups();
      this.toastr.success(res.message, 'OK...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.group.name = '';
      this.teacher = null;
      this.toUpdate = false;
    });

  }

  removeGroup(id:number) {
    
    let carDelete = this.groups[id];
    return this._universityService.deleteGroup(carDelete.id).subscribe((res: any) => {
      this.loadGroups();
    });

  }

  /*updatedCar(carUpdateId){
    
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
    

  }*/

  loadGroups() {
    return this._universityService.getAllGroup().subscribe((res: any[]) => {
      this.groups = res;
            
    });
  }

    
}
