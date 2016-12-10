import { Component, OnInit } from '@angular/core';

import { User } from '../models/User';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
	user: User;
	submitted: boolean = false;

  	constructor() { }

  	ngOnInit() {
  		this.user = { name: '', username: '' };
  	}

  	processUser() {
  		console.log(this.user);
  		this.submitted = true;
  	}

  	show(name) {
  		console.log(name);
  	}

}
