import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SortOption } from '../../domain/types/sort-option.type';
import { Store } from '@ngrx/store';
import { sortActions } from '../../application/sort.actions';
import { PageName } from '../../domain/enums/page-name.enum';

@Component({
  selector: 'sort-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NzFormModule,
    NzSelectModule,
  ],
  templateUrl: './sort-form.component.html',
  styleUrl: './sort-form.component.scss'
})
export class SortFormComponent implements OnInit {

  @Input() pageName!: PageName;
  @Input() sortOptions: SortOption[] = [];
  @Input() defaultSortOrder: string = 'ascend';

  protected sortForm!: FormGroup;

  constructor(private readonly _store: Store,
    private readonly _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.sortForm = this._formBuilder.group({
      field: [
        this.sortOptions.find(field => field.isDefault)?.value ?? this.sortOptions[0].value, 
        Validators.required,
      ],
      order: [
        this.defaultSortOrder,
        Validators.required,
      ],
    });

    // Update the page's sort configuration state whenever the sort form values are changed.
    this.sortForm.valueChanges.subscribe(() => {
      this.updateSortConfig();
    });

  }

  updateSortConfig(): void {
    this._store.dispatch(sortActions.updatePageSortConfig({
      pageSort: {
        pageName: this.pageName,
        sortConfig: this.sortForm.value,
      }
    }));
  }

}
