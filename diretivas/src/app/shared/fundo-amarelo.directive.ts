import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'p[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    //Usar em último caso, vulnerável a ataques
    //this._elementRef.nativeElement.style.backgroundColor = 'yellow';

    this._renderer.setStyle(_elementRef.nativeElement, 'background-color', 'yellow');
  }

}
