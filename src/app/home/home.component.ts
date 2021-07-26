import { Component, OnInit } from '@angular/core';

import Typed from 'typed.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  // avatar= 'assets/images/avatar.png';
  // avatar= 'assets/images/avatar2.png';
  // avatar= 'assets/images/Mihindu Ranasinghe2.jpg';
  avatar= 'assets/images/Mihindu Ranasinghe3.jpg';

  ngOnInit(): void {
    var options = {
      strings: ['','Full-Stack Engineer', 'Machine Learning','Cloud Native Enthusiast'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
    
    var typed = new Typed('.typed', options);
    typed.reset(true)
  }

}
