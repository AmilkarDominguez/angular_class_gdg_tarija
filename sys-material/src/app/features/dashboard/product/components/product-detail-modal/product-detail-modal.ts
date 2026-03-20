import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { Product } from '../../../../../core/models/product.model';

@Component({
  selector: 'app-product-detail-modal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
  ],
  templateUrl: './product-detail-modal.html',
  styleUrl: './product-detail-modal.scss',
})
export class ProductDetailModal {
  private dialogRef = inject(MatDialogRef<ProductDetailModal>);
  readonly product: Product = inject(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }

  onPrint(): void {
    window.print();
  }
}
