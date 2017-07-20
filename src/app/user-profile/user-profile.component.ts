import { Component, OnInit, OnDestroy  } from '@angular/core';
import {Router} from '@angular/router';
import {SharedService } from "./../shared.service";
import { CONST_ROUTING } from './../app.routing';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',

})
export class UserProfileComponent implements OnInit {

 private subscription: Subscription;

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

  ngOnInit() {

      this.subscription=this._sharedService.notifyObservable$.subscribe((userId) => {
      if (userId) {
              console.log(userId);
              this._sharedService.findUserById(userId)
                  .subscribe(lstresult => {
                      this.user = lstresult;
                      console.log("json result received "+lstresult);
                      },
                    error => { console.log(error); }
                  );
           }
          },  error => { console.log(error); }
     );
}

ngOnDestroy() {
   this.subscription.unsubscribe();
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
