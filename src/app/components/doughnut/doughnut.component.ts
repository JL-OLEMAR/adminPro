import { Component, Input } from '@angular/core'
import { Color, Label, MultiDataSet } from 'ng2-charts'

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: []
})
export class DoughnutComponent {
  @Input() title: string = 'No title'
  @Input('labels') doughnutChartLabels: Label[] = ['No label1', 'No label2', 'No label3']
  @Input('data') doughnutChartData: MultiDataSet = [[0, 0, 0]]
  @Input() colors: Color[] = [{ backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }]
}
