import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate
} from '@angular/animations';   // the animation classes needs to be imported from @angular/animations
import { transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [   // this is the defined trigger name that is bound to the template element
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal => highlighted', animate(300)),  // explicitelly indicate the state transition 'normal => highlighted'
      transition('highlighted => normal', animate(3000))
    ])
  ]
})
export class AppComponent {
  state = 'normal';  // this property is used to handle the initial state
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
  }
    onAdd(item) {
      this.list.push(item);
    }

    onDelete(item) {
      this.list.splice(this.list.indexOf(item), 1);
    }
}
