import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-custom-actions',
  template: `
  <div class="btn-group btn-group-sm" role="group">
  <button (click)="doEdit()"
          nbButton
          outline
          status="info"
          size="small"
          [disabled]="!isEditable"
          class="mr-2">
    Editar
  </button>
  <button (click)="doDelete()"
          nbButton
          outline
          status="danger"
          [disabled]="!isEditable"
          size="small">
    Excluir
  </button>
</div>
  `,
})
export class CustomActionsComponent implements ViewCell, OnInit {

  isEditable: boolean;

  @Input() value: any;
  @Input() rowData: any;

  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.isEditable = this.value === 'Draft';
  }

  doEdit() {
    this.edit.emit(this.rowData);
  }
  doDelete() {
    this.delete.emit(this.rowData);
  }

}
