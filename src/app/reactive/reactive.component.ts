import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

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
    
    errorFields: Object = {
    	name: '',
    	username: ''
    };
    errorMsgs: Object = {
    	name: {
    		required: 'Name is required',
    		minlength: 'Name length is at least 3 characters',
    		maxlength: 'Name length can\'t longer than 6 characters'
    	},
    	username: {
    		required: 'Username is required',
    		pattern: 'Username should be email'
    	}
    }

  	constructor(private fb: FormBuilder) { }

  	ngOnInit() {
  		// Using FormControl to create form
  		// this.form = new FormGroup({
  		// 	name : new FormControl(''),
  		// 	username: new FormControl('')
  		// });

  		// Using FormBuilder to create form
  		this.buildForm();
  	}

  	buildForm() {
  		this.form = this.fb.group({
  			name: ['', [ Validators.minLength(3), Validators.maxLength(6)]],
  			username: ['', [ Validators.pattern(this.re)]],
  			addresses: this.fb.array([
  				this.fb.group({
  					city: [''],
  					state: ['']
  				})
  			])
  		})

  		console.log(this.form);
  	
  		// watch changes and validate
  		this.form.valueChanges.subscribe( data => this.validateForm());
  	}

  	validateForm() {
		for (let field in this.errorFields) {
			// clear error message firstly
			this.errorFields[field] = '';
			// grab input field by name
			let input = this.form.get(field);
			
			if (input.invalid && input.dirty) {
				// loop errors of input
				for(let error in input.errors) {
					// assign error message into fieldMessages
					this.errorFields[field] = this.errorMsgs[field][error];
				}
			}
		}	
  	}

  	// Add an address
  	addAddress() {
  		let addresses: FormArray = <FormArray>this.form.get('addresses');
  		addresses.push(this.fb.group({
  			city: [''],
  			state: ['']
  		}));
  	}

  	// Remove an address
  	removeAddress(index) {
  		let addresses: FormArray = <FormArray>this.form.get('addresses');
  		addresses.removeAt(index);
  	}

  	processData() {
  		console.log(this.form.value);
  	}

}
