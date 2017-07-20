import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharedService } from "./../shared.service";
import { CONST_ROUTING } from './../app.routing';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',

})
export class UserProfileComponent implements OnInit {

user:{
   id: string,
   firstName : string,
   lastName : string,
   name :string,
   email : string,
   address : any,
   company: any,
   profilePic : any;

  };

  constructor(private _sharedService: SharedService, private router:Router) { }

  ngOnInit(): void {
    this._sharedService.findUserById("5d096307-8c70-4bff-9ad7-cd9c3205e055")
        .subscribe(lstresult => {
            this.user = lstresult;
            console.log("json result received "+lstresult);
            },
          error => { console.log(error); }
        );
}

deleteUser(user){

if(confirm("Are you sure to Delete the User "+user.firstName )) {
    this._sharedService.deleteUserById(user.id)
    .subscribe(response => {
         if(response){  // if user is deleted redirect to users view
            console.log("User is deleted in api");
            this.router.navigate(['/users']);
         }

        },
      error => { console.log(error);}
    );
  }




}


}
