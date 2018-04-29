import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  keyframes,
  group
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
      transition('normal <=> highlighted', animate(300)),  // explicitelly indicate the state transition 'normal => highlighted'
      // transition('highlighted => normal', animate(3000))
      // if the speed is the same fro both directions we can use <=> as defined
    ]),
    trigger('wildState', [   // this is the defined trigger name that is bound to the template element
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)',
        borderRadius: '0'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)',
        borderRadius: '0'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)',
        borderRadius: '0'
      })),
      transition('normal => highlighted', animate(300)),  // explicitelly indicate the state transition 'normal => highlighted'
      transition('highlighted => normal', animate(300)),
      // in the following transition we are defining an array of ohases
      // that will animate the entire switch state
      // we can use the '*' wildcard character to define any state
      transition('shrunken <=> *', [
        style( {  // no animate function so instantly apply the style
          backgroundColor: 'orange'
        }),
        animate(500, style({  // here animate and a style so it will take 500 ms to completelly apply the style
          borderRadius: '50px'
        })),
        animate(500)  // animate without style simply takes 500 ms to complete transition to final state
      ])
    ]),
    trigger('list1', [   // this is the defined trigger name that is bound to the template element
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [ // void is helpfull to identify when an elemtet didn't exist or goes away
        style({ // initial state as soon as the element enters the DOM
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)  // time to take to get to the final state
      ]),
      transition('* => void', [ // transition to define when an element is deleted
        animate(300, style({  // during the animate we define a final state, in this case is just before it's removed from DOM
          transform: 'translateX(100px)',
          opacity: 0
        })),
      ])
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([ // here every style will take an equal part of the time to execute unless explicitelly define with offset
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0 // initial style so is 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3 // at 0.3 of the time it should be in this state
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8 // // at 0.8 of the time it should be in this state
          }),
          style({
            transform: 'translateX(0)',
            opacity: 1,
            offset: 1 // final state, so at 3 seconds should be in this state
          })
        ]))
      ]),
      transition('* => void', [
        group([ // animations can be grouped to be executed at the same time or at least start at the same time
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class AppComponent {
  state = 'normal';  // this property is used to handle the initial state
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  animationStarted(event) {
    console.log(event);
  }

  animationEnded(event) {
    console.log(event);
  }

    onAnimate() {
      this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
      this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
    }

    onShrink() {
      this.wildState = 'shrunken';
    }
    onAdd(item) {
      this.list.push(item);
    }

    onDelete(item) {
      this.list.splice(this.list.indexOf(item), 1);
    }
}
