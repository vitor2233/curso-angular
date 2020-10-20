import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CursosService } from '../cursos/cursos.service';
import { CriarCursosComponent } from './criar-cursos.component';

@NgModule({
  declarations: [
    CriarCursosComponent
  ],
  imports: [
    CommonModule
  ],
  //providers: [CursosService],
  exports: [CriarCursosComponent]
})
export class CriarCursosModule { }
