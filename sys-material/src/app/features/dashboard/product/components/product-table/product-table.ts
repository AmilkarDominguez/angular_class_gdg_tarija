import { AfterViewInit, Component, effect, input, output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { Product } from '../../../../../core/models/product.model';

@Component({
  selector: 'app-product-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
})
export class ProductTable implements AfterViewInit {
  data = input<Product[]>([]);

  edit = output<Product>();
  view = output<Product>();
  delete = output<Product>();

  readonly displayedColumns = ['title', 'price', 'description', 'category', 'image', 'actions'];

  dataSource = new MatTableDataSource<Product>([]);

  sort = viewChild.required(MatSort);
  paginator = viewChild.required(MatPaginator);

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort();
    this.dataSource.paginator = this.paginator();

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'title':
          return item.title.toLowerCase();
        case 'price':
          return item.price;
        case 'description':
          return item.description;
        case 'category':
          return item.category;
        case 'image':
          return item.image;
        default:
          return '';
      }
    };
  }
}
