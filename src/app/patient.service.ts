import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  getPdfUrl(emailId): Observable<Object> {
    return this.http.post('https://acroinfer.in/getuserreport', { emailid: emailId });
  }

  updateUserProfile(obj: Object): Observable<Object> {
    return this.http.post('https://acroinfer.in/updateuser', obj);
  }

  getSpecificData(user: string) {
    return this.http.post('https://acroinfer.in/getuserdetailsspec', { emailid: user });
  }

  updateDoctorUserOfPatient(doctorObj) {
    return this.http.post('https://acroinfer.in/updateDoctorUser', doctorObj);
  }

  getPatientReportListForDoctor(userObj) {
    return this.http.post("https://acroinfer.in/getUserForDoctor", userObj);
  }
  getDoctorSpecificData(user: String) {
    return this.http.post('https://acroinfer.in/getdoctordetailsspec', { emailid: user });
  }

  sendRegisterUser(userObj) {
    return this.http.post('https://acroinfer.in/registeruser', userObj);
  }

  getotpForLogin(userObj) {
    return this.http.post('https://acroinfer.in/userlogin', userObj);
  }

  getUserFullDetails(emailid) {
    return this.http.post('https://acroinfer.in/getuser', { emailid });
  }

  getDoctorList() {
    return this.http.get("https://acroinfer.in/getDoctors");
  }

  sendEmailToDoctor(doctorObj): Observable<Object> {
    return this.http.post("https://acroinfer.in/getReportByEmail", doctorObj);
  }

  getMlImages(userObj): Observable<Object> {
    return this.http.post("https://acroinfer.in/getUserImages", userObj);
  }

  getSentimentValues(userObj) {
    return this.http.post("https://acroinfer.in/calculateSentiment", userObj);
  }
}
