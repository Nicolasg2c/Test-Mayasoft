import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SubdivisionService } from '../subdivision.service';

interface Cadena {
  cadena: String;
  tamSubcadena: number;
}

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {
  contador = 0;
  subdivision: String[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private service: SubdivisionService) { }

  
  texto: Cadena = {
    cadena: '',
    tamSubcadena: 0
  }
  
  enviar() {  
    this.subdivision = [];
    this.subdivision = this.service.subDividirCadena(this.texto.cadena, this.texto.tamSubcadena);
    
  }
  
  validarCondiciones(): boolean {
    return !(this.texto.tamSubcadena > 0 && this.texto.cadena.length > 0 
      && ((this.texto.cadena.split(" ").length == 1 && this.texto.tamSubcadena >= this.texto.cadena.trim().length) || this.texto.cadena.split(" ").length > 1 && this.getMaxLengthValue(this.texto.cadena) <= this.texto.tamSubcadena));
      
    }
    
    getMessageError(){
      if(this.validarCondiciones()){
        return 'Por favor ingrese una cadena valida'
      }
      else{
        return ''
      }
    }

  getMaxLengthValue(phrase: String) {
    const lengths: number[] = phrase.split(" ").map(
      (string) => string.trim().length
    )
    return Math.max(...lengths)
  }


  contarCaracteres(event: any) {
    this.contador = event.target.value.length
  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Introduzca su texto', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Introduzca un texto', cols: 2, rows: 1 },
      ];
    })
  );

}
