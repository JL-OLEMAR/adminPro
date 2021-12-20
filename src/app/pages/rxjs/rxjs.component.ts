import { Component } from '@angular/core'
import { Observable, interval } from 'rxjs'
import { filter, map, retry, take } from 'rxjs/operators' // eslint-disable-line @typescript-eslint/no-unused-vars

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent {
  constructor () {
  // this.retornaObservable()
  //   .pipe(retry(1)) // el retry es para que se vuelva a ejecutar el observable si hay un error
  //   .subscribe(
  //     valor => console.log('Subs', valor),
  //     error => console.warn('Error', error),
  //     () => console.info('Obs terminado')
  //   )

    this.retornaIntervalo()
      .subscribe(console.log)
  }

  retornaIntervalo (): Observable<number> {
    // el interval se maneja en milisegundos 1000ms = 1s
    return interval(500)
      .pipe(
        take(10), // el take es para que se detenga el observable despues de 10 iteraciones
        map(valor => (valor + 1)),
        filter(valor => ((valor % 2 === 0) && true))
      )
  }

  retornaObservable (): Observable<number> {
    let i = -1
    return new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        i++
        observer.next(i)

        if (i === 4) {
          clearInterval(intervalo)
          observer.complete()
        }

        if (i === 2) { observer.error('i llego al valor de 2') }
      }, 1000)
    })
  }
}
