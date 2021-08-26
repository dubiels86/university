import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../model/student.entity';
import { Configuration } from '../config/config';
import { Group } from '../model/group.entity';


@Injectable({
  providedIn: 'root'
})
export class UniversityService {
    
  endPoint = Configuration.apiEndpoint;
  constructor(
    private httpClient: HttpClient,
  ) { }

  
  getAllGroup() {
    return  this.httpClient.get(this.endPoint + '/groups');
  }

  getGroupById(id: number) {
    return  this.httpClient.get(`${this.endPoint}/groups/${id}`);
  }

  createGroup(g:Group) {
    return this.httpClient.post(this.endPoint + '/groups', g);
  }

  deleteGroup(id:number) {
    return this.httpClient.delete(`${this.endPoint}/groups/${id}`);
  }

  updateGroup(id: number, g:Group) {
    return this.httpClient.patch(`${this.endPoint}/groups/${id}`, g);
  }

  getAllStudents() {
    return  this.httpClient.get(this.endPoint + '/students');
  }

  getStudentById(id: number) {
    return  this.httpClient.get(`${this.endPoint}/students/${id}`);
  }

  createStudent(st:Student) {
    return this.httpClient.post(this.endPoint + '/students', st);
  }

  deleteStudent(id:number) {
    return this.httpClient.delete(`${this.endPoint}/students/${id}`);
  }

  updateStudent(id: number, st:Student) {
    return this.httpClient.patch(`${this.endPoint}/students/${id}`, st);
  }

  
}
