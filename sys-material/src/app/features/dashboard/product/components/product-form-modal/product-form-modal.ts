import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../../../../core/models/product.model';

export interface ProductFormData {
  product?: Product;
}

@Component({
  selector: 'app-product-form-modal',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product-form-modal.html',
  styleUrl: './product-form-modal.scss',
})
export class ProductFormModal implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ProductFormModal>);
  private data: ProductFormData = inject(MAT_DIALOG_DATA);

  get isEditMode(): boolean {
    return !!this.data?.product;
  }

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    price: [0, [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    category: ['', [Validators.required, Validators.maxLength(100)]],
    image: ['', [Validators.required, Validators.maxLength(500)]],
  });

  ngOnInit(): void {
    if (this.data?.product) {
      this.form.patchValue({
        title: this.data.product.title,
        price: this.data.product.price,
        description: this.data.product.description,
        category: this.data.product.category,
        image: this.data.product.image,
      });
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  getFieldError(field: string): string {
    const control = this.form.get(field);
    if (!control?.errors || !control.touched) return '';
    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['min']) return 'El valor debe ser mayor o igual a 0';
    if (control.errors['minlength'])
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors['maxlength'])
      return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    return 'Campo inválido';
  }
}
