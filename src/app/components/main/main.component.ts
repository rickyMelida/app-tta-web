import { Component, OnInit } from '@angular/core';
import { DataArduService } from 'src/app/services/data-ardu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [DataArduService]
})
export class MainComponent implements OnInit {

  seleccionado: number = 3000;
  user: string;
  status_ande: boolean;
  status_generador: boolean;
  estado: string;
  reset_status: boolean;
  start_status: boolean;



  data: any = {
    name: "button",
    status: "estado_boton"
  };

  constructor( private _dataArdu: DataArduService ) {

  }

  ngOnInit() {
    this.user = 'Admin';
    this.status_ande = false;
    this.status_generador = false;
    this.estadoAnde();
    this.estadoGenerador();
  }

  iniciar() {
    console.log('Inicia')
    this._dataArdu.start(this.seleccionado).subscribe(
      res => {
        console.log('Seee!');
        console.log(res);
      },
      err => {
        console.log('Error!!');
      }
    );
  }

  resetea() {
    setInterval(() => {
      this._dataArdu.reset().subscribe(
        res => {
          console.log('Se resetea');
        },
        err => {
          console.log('No se pudo resetear');
        }
      );
    }, 2000);

  }
  start() {
    if (!this.status_ande && !this.status_generador) {
      this.start_status = true;
      console.log(`Realizaste un arranque con una duracion de ${this.seleccionado} segundos`);

      this._dataArdu.start(this.seleccionado).subscribe(
        res => {
          console.log('Seee!');
          console.log(res);
        },
        err => {
          console.log('Error!!');
        }
      );
    } else {
      if (this.status_ande) {
        Swal.fire(
          'Ups!',
          'No puedes arrancar generador por que hay tension de Ande!',
          'warning'
        );
      }
      if (this.status_generador) {
        Swal.fire(
          'Alerta!',
          'El generador ya esta en marcha!',
          'warning'
        );
      }
    }
  }


  estadoAnde() {
    setInterval(() => {
      this._dataArdu.statusAnde().subscribe(
        res => {
          this.status_ande = res;
        },

        err => {
          console.log('Hay un error al recibir la señal de Ande');
        }
      );
    }, 1000);
  }

  estadoGenerador() {
    setInterval(() => {
      this._dataArdu.statusGenerador().subscribe(
        res => {
          // console.log(`La señal del generador es ${res}`);
          this.status_generador = res;
        },
        err => {
          console.log(`Hubo un error al recibir la señal del generador`);
        }
      );
    }, 1000);
  }

  estados() {
    console.log(`El generador esta en ${this.status_generador} y ande esta en ${this.status_ande}`);
  }

  reset() {
    this.reset_status = true;
    this._dataArdu.reset().subscribe(
      res => {
        console.log('Se resetea');
      },
      err => {
        console.log('No se pudo resetear');
      }
    );
  }

}
