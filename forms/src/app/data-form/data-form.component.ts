import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EstadoBr } from '../shared/models/estado-br';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService
  ) { }

  ngOnInit(): void {

    this.dropdownService.getEstadosBr().subscribe(
      dados => this.estados = dados
    );

    this.formulario = this.formBuilder.group({
      nome: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]],
      email: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.email
      ]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      })
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post',
        JSON.stringify(this.formulario.value))
        .pipe(map(dados => dados))
        .subscribe(dados => {
          console.log(dados);
          //Reseta form
          this.resetar();
        }, (error: any) => alert('Erro'));
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    //Pegar cada item dentro do formulario
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      //Verificar se é um grupo de dados
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle)
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  consultaCEP() {

    let cep = this.formulario.get('endereco.cep').value;

    //Tirar letras
    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      //Precisa ter 8 dígitos de 0 a 9
      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {

        this.resetaDadosForm();

        this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
          .subscribe(dados => this.populaDadosForm(dados));
      }
    }
  }

  populaDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    this.formulario.get('nome').setValue('Vitor');
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');


    if (campoEmail.errors) {
      return campoEmail.errors.required && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

}
