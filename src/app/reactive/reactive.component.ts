import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

	form: FormGroup;

  	constructor(private fb: FormBuilder) { }

  	ngOnInit() {
  		// Using FormControl to create form
  		// this.form = new FormGroup({
  		// 	name : new FormControl(''),
  		// 	username: new FormControl('')
  		// });

  		// Using FormBuilder to create form
  		this.form = this.fb.group({
  			name: '',
  			username: ''
  		})
  		console.log(this.form);
  	}

  	processData() {
  		console.log(this.form.value);
  	}

}
