import { analyzeAndValidateNgModules } from "@angular/compiler";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {  FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { createPopper } from "@popperjs/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Group } from "src/app/model/group.entity";
import { Student } from "src/app/model/student.entity";
import { UniversityService } from "src/app/services/university.service";
import Swal from "sweetalert2";



@Component({
  selector: "app-card-addgroup",
  templateUrl: "./card-addgroup.component.html"
})
export class CardAddGroupComponent implements OnInit {

 
  openTab = 1;

  groups: any[] = [];
  group: Group = new Group();
  groupId:number;
  toUpdateGroup = false;
  groupUpdateId: number;
  teacher:string;
  groupSelectId: number;

  students: any[] = [];
  student: Student = new Student();
  studentId: number;
  toUpdateStudent = false;
  private _keyinhandService: any;


  constructor(private sanitizer: DomSanitizer, 
              private _universityService: UniversityService,
              private toastr: ToastrService,
              
              ) {}

  ngOnInit(): void {
   

    this.findAllGroups();
    
    
  }

  

  //---------Group-------------------
  findAllGroups() {
    
    return this._universityService.getAllGroup().subscribe((res: any) => {
      
      this.groups = res;
      console.log(res);
    });
  }

  createGroup() {
    
    if(this.group.name){
      this.group.teacher = this.teacher;
      return this._universityService.createGroup(this.group).subscribe((res: any) => {
      
        this.findAllGroups();
        this.group.name = '';
        this.teacher = null;
        this.toastr.success(res.message, 'OK...', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }, ex => {
        
        if(ex.status===409){
          this.toastr.error('El grupo ya existe', 'Ops...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }  
        
      });
    } else {
      this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
    
  }

  groupToUpdate(id:number) {
    this.toUpdateGroup = true;
    let gUpdate = this.groups[id];
    this.group.id = gUpdate.id;
    this.group.name = gUpdate.name;
       
  }

  groupUpdated(){
    
    if(this.group.name){
      this.group.teacher = this.teacher;
      return this._universityService.updateGroup(this.group.id, this.group).subscribe((res: any) => {
      this.findAllGroups();
      this.toastr.success(res.message, 'OK...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.group.name = '';
      this.teacher = null;
      this.toUpdateGroup = false;
    });
  } else {
    this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }
  }

  deleteGroup(id:number){
    const groupDeleteId = this.groups[id].id;
    Swal.fire({
      title: 'Estás seguro?',
      text: "Desea eliminar el grupo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        return this._keyinhandService.deleteProvider(groupDeleteId).subscribe((res:any)=>{
          this.toastr.warning(res.message, 'OK...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.findAllGroups();
        },ex => {
        debugger
          if(ex.status===422){
            this.toastr.error(ex.error.message, 'Ops...', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }  
          
        })
        
      }
    })
   
  }

  findAllStudents() {
    return this._universityService.getAllStudents().subscribe((res: any[]) => {
      
      this.students = res;
    });
  }

  createStudent() {
    this.student.group = this.groupSelectId;
    if(this.student.name && this.student.age){
      return this._universityService.createStudent(this.student).subscribe((res: any) => {
      
        this.findAllStudents();
        this.student.name = '';
        this.student.age = null;
        this.toastr.success(res.message, 'OK...', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }, ex => {
        
        if(ex.status===409){
          this.toastr.error('El estudiante ya existe', 'Ops...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }  
        
      });
    } else {
      this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
    
  }

  studentToUpdate(id:number) {
    
    this.toUpdateStudent = true;
    const cUpdate = this.students[id];
    this.student.id = cUpdate.id;
    this.student.name = cUpdate.name;
    //this.providerId = cUpdate.proveedor.id;
    //this.providers[this.providerId].nombre = cUpdate.proveedor.nombre;
       
  }

  studentUpdated(){
    
    if(this.student.name && this.student.age){
      return this._universityService.updateStudent(this.student.id, this.student).subscribe((res: any) => {
      this.findAllStudents();
      this.toastr.success(res.message, 'OK...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.student.name = '';
      this.student.age =  null;
      this.toUpdateStudent = false;
    });
  } else {
    this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }
  }

  deleteStudent(id:number){
    const studentDeleteId = this.students[id].id;
    Swal.fire({
      title: 'Estás seguro?',
      text: "Desea eliminar el estudiante!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        return this._universityService.deleteStudent(studentDeleteId).subscribe((res:any)=>{
          this.toastr.warning(res.message, 'OK...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.findAllStudents();
        },ex => {
        debugger
          if(ex.status===422){
            this.toastr.error(ex.error.message, 'Ops...', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }  
          
        })
        
      }
    })
   
  }

  

  /*findAllInvoices() {
    return this._keyinhandService.getInvoices().subscribe((res: any[]) => {
      
      this.invoices = res;
    });
  }

  createInvoice() {
    this.invoice.contrato = this.contractId;
    
    if(this.invoice.no && this.contractId && this.invoice.descripcion){
      return this._keyinhandService.createInvoice(this.invoice).subscribe((res: any) => {
      
        this.findAllInvoices();
        this.invoice.no = '';
        this.invoice.descripcion = '';
        this.contractId = null;
        this.toastr.success(res.message, 'OK...', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }, ex => {
        
        if(ex.status===409){
          this.toastr.error('La Factura ya existe', 'Ops...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }  
        
      });
    } else {
      this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
    
  }

  invoiceToUpdate(id:number) {
    
    this.toUpdateInvoice = true;
    const invoiceUpdate = this.invoices[id];
    this.invoice.id = invoiceUpdate.id;
    this.invoice.no = invoiceUpdate.no;
    this.invoice.descripcion = invoiceUpdate.descripcion;
    this.contractId = invoiceUpdate.contrato.id;
    this.contractsKeyinhand[this.contractId].no = invoiceUpdate.contrato.no;
       
  }

  invoiceUpdated(){
    
    if(this.invoice.no && this.contractId){
      return this._keyinhandService.updateInvoice(this.invoice.id, this.invoice).subscribe((res: any) => {
      this.findAllInvoices();
      this.toastr.success(res.message, 'OK...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.invoice.no = '';
      this.invoice.descripcion = '';
      this.contractId =  null;
      this.toUpdateInvoice = false;
    });
  } else {
    this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }
  }

  deleteInvoice(id:number){
    const invoiceDeleteId = this.invoices[id].id;
    Swal.fire({
      title: 'Estás seguro?',
      text: "Desea eliminar la factura!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        debugger
        return this._keyinhandService.deleteInvoice(invoiceDeleteId).subscribe((res:any)=>{
          this.toastr.warning(res.message, 'OK...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.findAllInvoices();
        },ex => {
        debugger
          if(ex.status===422){
            this.toastr.error(ex.error.message, 'Ops...', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }  
          
        })
        
      }
    })
  }

  findAllWarehouses() {
    return this._keyinhandService.getWarehouses().subscribe((res: any[]) => {
      
      this.warehouses = res;
    });
  }

  createWarehouse() {
    this.warehouse.estructura = this.officeId;
    
    if(this.warehouse.nombre && this.officeId && this.warehouse.direccion){
      return this._keyinhandService.createWarehouse(this.warehouse).subscribe((res: any) => {
      
        this.findAllWarehouses();
        this.warehouse.nombre = '';
        this.warehouse.direccion = '';
        this.officeId = null;
        this.toastr.success(res.message, 'OK...', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }, ex => {
        
        if(ex.status===409){
          this.toastr.error('El Almacén ya existe', 'Ops...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }  
        
      });
    } else {
      this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
    
  }

  warehouseToUpdate(id:number) {
    
    this.toUpdateWarehouse = true;
    const warehouseUpdate = this.warehouses[id];
    this.warehouse.id = warehouseUpdate.id;
    this.warehouse.nombre = warehouseUpdate.nombre;
    this.warehouse.direccion = warehouseUpdate.direccion;
    this.officeId = warehouseUpdate.estructura.id;
    this.warehouses[this.officeId].estructura.nombre = warehouseUpdate.estructura.nombre;
       
  }

  warehouseUpdated(){
    
    if(this.warehouse.nombre && this.officeId){
      this.warehouse.estructura = this.officeId;
      return this._keyinhandService.updateWarehouse(this.warehouse.id, this.warehouse).subscribe((res: any) => {
      this.findAllWarehouses();
      this.toastr.success(res.message, 'OK...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.warehouse.nombre = '';
      this.warehouse.direccion = '';
      this.officeId =  null;
      this.toUpdateWarehouse = false;
    });
  } else {
    this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }
  }

  deleteWarehouse(id:number){
    const warehouseDeleteId = this.warehouses[id].id;
    Swal.fire({
      title: 'Estás seguro?',
      text: "Desea eliminar el almacén!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        return this._keyinhandService.deleteWarehouse(warehouseDeleteId).subscribe((res:any)=>{
          this.toastr.warning(res.message, 'OK...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.findAllWarehouses();
        },ex => {
        
          if(ex.status===422){
            this.toastr.error(ex.error.message, 'Ops...', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }  
          
        })
        
      }
    })
  }

  findAllUbications() {
    return this._keyinhandService.getUbications().subscribe((res: any[]) => {
      
      this.ubications = res;
    });
  }

  createUbication() {
    this.ubication.almacen = this.warehouseId;
    
    if(this.ubication.nombre && this.warehouseId){
      return this._keyinhandService.createUbication(this.ubication).subscribe((res: any) => {
      
        this.findAllUbications();
        this.ubication.nombre = '';
        this.warehouseId = null;
        this.toastr.success(res.message, 'OK...', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }, ex => {
        
        if(ex.status===409){
          this.toastr.error('La ubicacion ya existe', 'Ops...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }  
        
      });
    } else {
      this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
    
  }

  ubicationToUpdate(id:number) {
    
    this.toUpdateUbication = true;
    const ubicationUpdate = this.ubications[id];
    this.ubication.id =        ubicationUpdate.id;
    this.ubication.nombre =    ubicationUpdate.nombre;
    this.warehouseId = ubicationUpdate.almacen.id;
    this.ubications[this.warehouseId].almacen.nombre = ubicationUpdate.almacen.nombre;
       
  }

  ubicationUpdated(){
    
    if(this.ubication.nombre && this.warehouseId){
      this.ubication.almacen = this.warehouseId;
      return this._keyinhandService.updateUbication(this.ubication.id, this.ubication).subscribe((res: any) => {
      this.findAllUbications();
      this.toastr.success(res.message, 'OK...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.ubication.nombre = '';
      this.warehouseId =  null;
      this.toUpdateUbication = false;
    });
  } else {
    this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }
  }

  deleteUbication(id:number){
    const ubicationDeleteId = this.ubications[id].id;
    Swal.fire({
      title: 'Estás seguro?',
      text: "Desea eliminar la ubicación del almacén!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        return this._keyinhandService.deleteUbication(ubicationDeleteId).subscribe((res:any)=>{
          this.toastr.warning(res.message, 'OK...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.findAllUbications();
        },ex => {
        
          if(ex.status===422){
            this.toastr.error(ex.error.message, 'Ops...', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }  
          
        })
        
      }
    })
  }

  findAllOffices() {
    return this._keyinhandService.getOffices().subscribe((res: any) => {
      this.offices = res;
    });
  }

  createOffice() {
        
    if(this.office.nombre && this.office.siglas){
      
      return this._keyinhandService.createOffice(this.office).subscribe((res: any) => {
      
        this.findAllOffices();
        this.office.nombre = '';
        this.office.siglas = '';
        this.toastr.success(res.message, 'OK...', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }, ex => {
        
        if(ex.status===409){
          this.toastr.error('La oficina ya existe', 'Ops...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }  
        
      });
    } else {
      this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
    }
    
  }

  officeToUpdate(id:number) {
    
    this.toUpdateOffice = true;
    const officeUpdate = this.offices[id];
    this.office.id =        officeUpdate.id;
    this.office.nombre =    officeUpdate.nombre;
    this.office.siglas =    officeUpdate.siglas;
       
  }

  officeUpdated(){
    
    if(this.office.siglas && this.office.nombre){
      
      return this._keyinhandService.updateOffice(this.office.id, this.office).subscribe((res: any) => {
      this.findAllOffices();
      this.toastr.success(res.message, 'OK...', {
        timeOut: 3000, positionClass: 'toast-top-center',
      });
      this.office.nombre = '';
      this.office.siglas =  '';
      this.toUpdateOffice = false;
    });
  } else {
    this.toastr.error('No puede dejar campos vacíos', 'Ops...', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }
  }

  deleteOffice(id:number){
    const officeDeleteId = this.offices[id].id;
    Swal.fire({
      title: 'Estás seguro?',
      text: "Desea eliminar la Unidad Organizativa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        return this._keyinhandService.deleteOffice(officeDeleteId).subscribe((res:any)=>{
          this.toastr.warning(res.message, 'OK...', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.findAllOffices();
        },ex => {
        
          if(ex.status===422){
            this.toastr.error(ex.error.message, 'Ops...', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }    
        })
        
      }
    })
  }*/

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }


  

  
}
