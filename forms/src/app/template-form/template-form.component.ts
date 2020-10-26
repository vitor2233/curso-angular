import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form){

  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep){
    console.log(cep);

    //Tirar letras
    cep = cep.replace(/\D/g, '');

    if(cep != ""){
      //Precisa ter 8 dígitos de 0 a 9
      const validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)){
        this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
          .subscribe(dados => console.log(dados));
      }
    }
    
  }

}
