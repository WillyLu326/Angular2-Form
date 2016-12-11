import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

	form: FormGroup;
	nameErrorMsg: string;
	usernameErrorMsg: string;
    re: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  	constructor(private fb: FormBuilder) { }

  	ngOnInit() {
  		// Using FormControl to create form
  		// this.form = new FormGroup({
  		// 	name : new FormControl(''),
  		// 	username: new FormControl('')
  		// });

  		// Using FormBuilder to create form
  		this.form = this.fb.group({
  			name: ['', 
  				   [ 
  				   	 	Validators.minLength(3), 
  				   	 	Validators.maxLength(6)
  				   ]
  				],
  			username: ['', 
  					[ 
  						Validators.pattern(this.re)
  					]
  				]
  		})
  	
  		// watch changes and validate
  		this.form.valueChanges.subscribe( data => {
  			this.nameErrorMsg = '';
  			this.usernameErrorMsg = '';
  			
  			let name = this.form.get('name');
  			let username = this.form.get('username');

  			if (name.invalid && name.touched) {
  				if (name.errors['required']) {
  					this.nameErrorMsg = 'Name is required';
  				}
  				
  				if (name.errors['minlength']) {
  					this.nameErrorMsg = 'Name length is at least 3 characters.';
  				}

  				if (name.errors['maxlength']) {
  					this.nameErrorMsg = 'Name length cant\'t more than 6 characters.';
  				}
  			}

  			if (username.invalid && username.touched) {
  				if (username.errors['required']) {
  					this.usernameErrorMsg = 'Username is required.';
  				}

  				if (username.errors['pattern']) {
  					this.usernameErrorMsg = 'Username should be email';
  				}
  			}
  		})
  	}

  	processData() {
  		console.log(this.form.value);
  	}

}
