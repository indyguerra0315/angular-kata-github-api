import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @HostBinding('class.sort') sort = true;
  @HostBinding('class.sort-asc') asc = true;
  @HostBinding('class.sort-hovering') hovering = false;

  @HostListener('mouseenter') onMouseEnter() {
    this.hovering = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hovering = false;
  }

  @HostListener('click') onClick() {
    this.asc = !this.asc;
  }

  @Input() set appSort(value: boolean) {
    this.asc = value;
  }

  constructor() { }

}
