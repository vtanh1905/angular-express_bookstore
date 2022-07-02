import { Directive, Input } from '@angular/core';
import { PaginationActiveDirective } from './pagination-active.directive';
import { PaginationDisableDirective } from './pagination-disable.directive';

@Directive({
  selector: '[appPagiantion]',
})
export class PaginationDirective {
  paginationActives: PaginationActiveDirective[] = [];
  paginationDisables: PaginationDisableDirective[] = [];

  @Input('totalPage') totalPage: number = 0;

  addPaginationActives(item: PaginationActiveDirective) {
    this.paginationActives.push(item);
  }
  addPaginationDisables(item: PaginationDisableDirective) {
    this.paginationDisables.push(item);
  }

  reload(currentPage : number){
    this.paginationActives.forEach((item) => {
      if (currentPage === item._defaultPage) {
        item.addClassActive = true;
      } else {
        item.addClassActive = false;
      }
    });
    if (currentPage === 0) {
      this.paginationDisables.forEach((item) => {
        if (item._defaultValue === 'left') {
          item.addClassDisabled = true;
        } else {
          item.addClassDisabled = false;
        }
      });
    } else if (currentPage === this.totalPage - 1) {
      this.paginationDisables.forEach((item) => {
        if (item._defaultValue === 'right') {
          item.addClassDisabled = true;
        } else {
          item.addClassDisabled = false;
        }
      });
    } else {
      this.paginationDisables.forEach((item) => {
        item.addClassDisabled = false;
      });
    }
  }

  onClick(target: PaginationActiveDirective) {
    this.reload(target._defaultPage);
  }
}
