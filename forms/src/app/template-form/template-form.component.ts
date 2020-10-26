import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  onSubmit(form) {
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .pipe(map(dados=> dados))
      .subscribe(dados => console.log(dados));
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep, form) {

    //Tirar letras
    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      //Precisa ter 8 dígitos de 0 a 9
      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {

        this.resetaDadosForm(form);

        this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
          .subscribe(dados => this.populaDados(dados, form));
      }
    }

  }

  populaDados(dados, form) {
    /*form.setValue({
      nome: form.value.nome,
      email: form.value.email,
      endereco: {
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });*/

    form.form.patchValue({
      endereco: {
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(formulario){
    formulario.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}
