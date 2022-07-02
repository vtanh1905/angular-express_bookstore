import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationDirective } from './pagination.directive';

@Directive({
  selector: '[appPaginationActive]',
})
export class PaginationActiveDirective {
  constructor(
    private route: ActivatedRoute,
    private paginationDirective: PaginationDirective
  ) {
    paginationDirective.addPaginationActives(this);
  }

  _defaultPage: number = 0;

  @Input('appPaginationActive') set appPaginationActive(value: number) {
    this._defaultPage = value;
    let currnetPage = this.route.snapshot.queryParamMap.get('page') || '0';
    if (currnetPage === `${this._defaultPage}`) {
      this.addClassActive = true;
    } else {
      this.addClassActive = false;
    }
  }

  @HostBinding('class.active') addClassActive: boolean = false;

  @HostListener('click') onClick() {
    this.paginationDirective.onClick(this);
  }
}
