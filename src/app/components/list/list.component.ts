import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/entities/Item';
import { LoadingService } from 'src/app/services/loading.service';

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

  constructor(private router: Router,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  reset(): void {
    this.loadingService.toggleLoading(false);
    this.router.navigate(['/']);
  }

  onShowMore() {
    this.showMore.emit();
  }

}
