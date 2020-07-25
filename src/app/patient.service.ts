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
    return this.http.post('http://ec2-13-235-31-214.ap-south-1.compute.amazonaws.com/getuserreport', { emailid: emailId });
  }

  updateUserProfile(obj: Object): Observable<Object> {
    return this.http.post('http://ec2-13-235-31-214.ap-south-1.compute.amazonaws.com/updateuser', obj);
  }

  getSpecificData(user: string) {
    return this.http.post('http://ec2-13-235-31-214.ap-south-1.compute.amazonaws.com/getuserdetailsspec', { emailid: user });
  }

  sendRegisterUser(userObj) {
    return this.http.post('http://ec2-13-235-31-214.ap-south-1.compute.amazonaws.com/registeruser', userObj);
  }

  getotpForLogin(userObj) {
    return this.http.post('http://ec2-13-235-31-214.ap-south-1.compute.amazonaws.com/userlogin', userObj);
  }

  getUserFullDetails(emailid) {
    return this.http.post('http://ec2-13-235-31-214.ap-south-1.compute.amazonaws.com/getuser', { emailid });
  }

  getDoctorList() {
    return this.http.get("http://ec2-13-235-31-214.ap-south-1.compute.amazonaws.com/getDoctors");
  }
  
  sendEmailToDoctor(doctorObj): Observable<Object>{
    return this.http.post("http://ec2-13-235-31-214.ap-south-1.compute.amazonaws.com/getReportByEmail",doctorObj);
  }
}
