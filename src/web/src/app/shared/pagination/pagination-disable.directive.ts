import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationDirective } from './pagination.directive';

@Directive({
  selector: '[appPaginationDisable]',
})
export class PaginationDisableDirective {
  constructor(
    private paginationDirective: PaginationDirective,
    private route: ActivatedRoute
  ) {
    paginationDirective.addPaginationDisables(this);
  }

  @Input('appPaginationDisable') set appPaginationDisable(value: string) {
    this._defaultValue = value;
    let currnetPage = this.route.snapshot.queryParamMap.get('page') || '0';
    if (currnetPage === '0' && value === 'left') {
      this.addClassDisabled = true;
    }

    if (
      currnetPage === `${this.paginationDirective.totalPage - 1}` &&
      value === 'right'
    ) {
      this.addClassDisabled = true;
    }
  }

  @HostBinding('class.disabled') addClassDisabled: boolean = false;

  @HostListener('click', ['$event.target']) onClick(target: any) {
    let currnetPage = this.route.snapshot.queryParamMap.get('page')
    console.log(currnetPage);
    if(currnetPage !== null && +currnetPage !== 0 && target.parentNode.innerText === "«"){
      this.paginationDirective.reload((+currnetPage) - 1);
      return
    }
    
    if(currnetPage !== null && +currnetPage !== (this.paginationDirective.totalPage) && target.parentNode.innerText === "»"){
      this.paginationDirective.reload((+currnetPage) + 1);
    }
  }

  _defaultValue: string = 'left';
}
