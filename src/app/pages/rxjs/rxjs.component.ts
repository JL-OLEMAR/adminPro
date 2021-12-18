import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { retry } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent {
  constructor () {
    this.retornaObservable()
      .pipe(retry(1)) // el retry es para que se vuelva a ejecutar el observable si hay un error
      .subscribe(
        valor => console.log('Subs', valor),
        error => console.warn('Error', error),
        () => console.info('Obs terminado')
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
