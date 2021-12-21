import { Component, OnDestroy } from '@angular/core'
import { ActivationEnd, Data, Router } from '@angular/router'
import { Subscription, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo!: string
  public tituloSubs$!: Subscription

  constructor (private readonly router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta()
      .subscribe(({ titulo }) => {
        this.titulo = titulo
        document.title = `AdminPro - ${(titulo) as string}`
      })
  }

  ngOnDestroy (): void {
    this.tituloSubs$.unsubscribe()
  }

  getArgumentosRuta (): Observable<Data> {
    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
  }
}
