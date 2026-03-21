import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../core/models/product.model';
import { ProductsService } from '../../../core/services/products-service';
import { ProductTable } from './components/product-table/product-table';
import { ProductFormModal, ProductFormData } from './components/product-form-modal/product-form-modal';
import { ProductDetailModal } from './components/product-detail-modal/product-detail-modal';
import { ProductDeleteConfirmModal } from './components/product-delete-confirm-modal/product-delete-confirm-modal';

@Component({
  selector: 'app-product-dashboard',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, ProductTable],
  templateUrl: './product-dashboard.html',
  styleUrl: './product-dashboard.scss',
})
export class ProductDashboard implements OnInit {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private productsService = inject(ProductsService);

  private products = signal<Product[]>([]);
  searchTerm = signal('');
  loading = signal(false);

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.products();
    return this.products().filter(
      (p) => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term),
    );
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {

    this.loading.set(true);

    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.snackBar.open('Error al cargar los productos', 'Cerrar', { duration: 3000 });
        this.loading.set(false);
      },
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  openCreateModal(): void {
    const ref = this.dialog.open(ProductFormModal, {
      width: '42rem',
      maxWidth: '95vw',
      data: {} satisfies ProductFormData,
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.productsService.create(result).subscribe({
        next: (newProduct) => {
          this.products.update((list) => [newProduct, ...list]);
          this.snackBar.open('Producto registrado correctamente', 'Cerrar', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error al registrar el producto', 'Cerrar', { duration: 3000 });
        },
      });
    });
  }

  onEdit(product: Product): void {
    const ref = this.dialog.open(ProductFormModal, {
      width: '42rem',
      maxWidth: '95vw',
      data: { product } satisfies ProductFormData,
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.productsService.update(product.id, result).subscribe({
        next: (updated) => {
          this.products.update((list) =>
            list.map((p) => (p.id === product.id ? { ...p, ...updated } : p)),
          );
          this.snackBar.open('Producto actualizado correctamente', 'Cerrar', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error al actualizar el producto', 'Cerrar', { duration: 3000 });
        },
      });
    });
  }

  onView(product: Product): void {
    this.dialog.open(ProductDetailModal, {
      width: '38rem',
      maxWidth: '95vw',
      data: product,
    });
  }

  onDelete(product: Product): void {
    const ref = this.dialog.open(ProductDeleteConfirmModal, {
      width: '28rem',
      maxWidth: '95vw',
      data: product,
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.productsService.delete(product.id).subscribe({
        next: () => {
          this.products.update((list) => list.filter((p) => p.id !== product.id));
          this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Error al eliminar el producto', 'Cerrar', { duration: 3000 });
        },
      });
    });
  }
}
