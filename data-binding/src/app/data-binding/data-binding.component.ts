import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://loiane.com';
  cursoAngular: boolean = true;
  urlImagem: string = 'https://avatars3.githubusercontent.com/u/45835780?s=460&u=34c02db4efa6fddf81d27bf3c0459f2d0a759ed8&v=4';

  getValor() {
    return 1
  }

  getCurtirCurso() {
    return true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
