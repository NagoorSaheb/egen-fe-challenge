import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {SharedService } from "./../shared.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',

})
export class AddUserComponent implements OnInit {

  bootstrap: [AddUserComponent];
  addUser : FormGroup;

constructor(private _sharedService: SharedService, fb:FormBuilder){

this.addUser = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.

      'firstName' : '',
      'lastName': '',
      'email' : '',
      'address':{
                  'street': '',
                    'city':'',
                    'state':'',
                    'zip':'',
                    'country':''
                },

      'company':{
                'companyName':'',
                'companyWebsite':''
                },

      'profilePic':''
    })
  }

  ngOnInit() {

  }

  addUserToGroup(){


    this._sharedService.addUserToGroup(JSON.stringify(this.addUser))
      .subscribe(lstresult => {
        if(lstresult){
        console.log("user added");
        }
         },
        error => {console.log(error);}
          );
     }
}
