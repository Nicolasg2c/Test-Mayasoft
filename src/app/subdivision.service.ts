import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {
  constructor() {
  }
  

  public subDividirCadena(cadena:String, subdivision:number):String[]{
     let contador = 0;
     let lista=[];
     let frase="";
     let resultado=[];     

     lista = cadena.split(" ");
      let subcadena = '';
      const LastItem = lista[lista.length-1];
      for (let item of lista){
        if(subcadena.length==0){
          subcadena=item;
          if(item == LastItem){resultado.push(subcadena);}
        }else if(`${subcadena} ${item}`.length<=subdivision){
          subcadena = `${subcadena} ${item}`;
          if(item == LastItem){resultado.push(subcadena);}
        }
        else{
          resultado.push(subcadena);
          if(item == LastItem){resultado.push(item)}
          subcadena=item;
        }
      }
      
       return resultado;
    
    }
}
