import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Subject }  from 'rxjs/Subject';

@Injectable()
export class SharedService {


   egenSolutionUrl = "http://mocker.egen.io/users/";

   private notify = new Subject<any>();
   notifyObservable$ = this.notify.asObservable();

  constructor(private _http: Http) { }

public notifyOther(data: any) {
     console.log(data);
      if (data) {
        this.notify.next(data.id);
      }
    }


  findAllUsers() {
               return this._http.get(this.egenSolutionUrl)
               .map(response => { { return response.json() }; })
               .catch(error => Observable.throw(error.json().error));
                  }

   findUserById(userId) {
               return this._http.get(this.egenSolutionUrl + userId)
                        .map(response => { { return response.json() }; })
                        .catch(error => Observable.throw(error.json().error));
                         }

   deleteUserById(userId) {
             return this._http.delete(this.egenSolutionUrl + userId)
                        .map(response => { { return response.json() }; })
                        .catch(error => Observable.throw(error.json().error));
                         }

 addUserToGroup(user) {
              return this._http.post(this.egenSolutionUrl,user)
                 .map(response => { { return response.json() }; })
                 .catch(error => Observable.throw(error.json().error));
                  }


}
