import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../../contracts/Item';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() type!: string;
  @Input() column1!: string;
  @Input() column2!: string;
  @Input() data: Item[] = [];
  @Input() totalItems!: number | undefined;

  @Output() showMore = new EventEmitter();
  isLoadingMore: boolean = false;
  subscription: Subscription;

  // let sort['ascSortNameColumn', 'ascSortCountColumn'] = [true, true];
  ascSortNameColumn: boolean = true;
  ascSortCountColumn: boolean = true;

  constructor(private router: Router,
    private loadingService: LoadingService) {
      this.subscription = this.loadingService
      .onToggle()
      .subscribe((value) => (this.isLoadingMore = value));
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  reset(): void {
    this.loadingService.toggleLoading(false);
    this.router.navigate(['/']);
  }

  onShowMore() {
    this.showMore.emit();
    this.isLoadingMore = true;
  }

  orderByName(columnName: string, ascSort: boolean): void {
    this.data.sort((a: Item, b: Item) => {
      const keyTyped = columnName as keyof typeof a;

      // Return -1 if any element data are empty
      if (!a[keyTyped] || !b[keyTyped]) {
        return -1;
      }

      console.log(a[keyTyped], b[keyTyped]);
      return a[keyTyped] && b[keyTyped] ? -1 : 1;
    });
  }

}
