import { Component } from '@angular/core'

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: []
})
export class Grafica1Component {
  labels1: string[] = ['Pollo', 'Pescado', 'Cerdo']
  labels2: string[] = ['Pai de manzana', 'Chocolate', 'Helado']
  labels3: string[] = ['Gaseosa', 'Agua', 'Café']
  labels4: string[] = ['Monitor', 'Mouse', 'Memoria RAM']

  data1 = [[150, 50, 100]]
  data2 = [[20, 10, 5]]
  data3 = [[32, 23, 54]]
  data4 = [[45, 21, 21]]

  colors1 = [{ backgroundColor: ['#D5A852', '#0671B1', '#D5807A'] }]
  colors2 = [{ backgroundColor: ['#D5A851', '#64331E', '#A35C5E'] }]
  colors3 = [{ backgroundColor: ['#E8C532', '#3889BC', '#765343'] }]
  colors4 = [{ backgroundColor: ['#6857E6', '#009FEE', '#255B27'] }]
}
