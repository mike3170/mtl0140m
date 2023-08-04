import { Component, Input, OnInit } from '@angular/core';
import { ColDef, ColumnResizedEvent, GridApi, GridOptions } from 'ag-grid-community';
import { MtlPurOrdeD } from '../mtl-pur-orde-d';

@Component({
  selector: 'app-mtl-pur-orde-d',
  templateUrl: './mtl-pur-orde-d.component.html',
  styleUrls: ['./mtl-pur-orde-d.component.scss']
})
export class MtlPurOrdeDComponent implements OnInit {
  @Input() purOrdeDetailBody!: MtlPurOrdeD;
  private gridApi: any;
  private gridColumnApi: any;
  rowData: any;
  defaultColDef: ColDef = {
    resizable: true
  }

  columnDefs: ColDef[] = [
    {headerClass:'ag-center-header', headerName:'項次', field: 'itemNo', width: 100, resizable: true, type: 'numericColumn'},
    {headerClass:'ag-center-header', headerName:'物料代號', field: 'mtlNo', editable: true, resizable: true, filter: 'agTextColumnFilter', sortable: true},
    { headerName:'訂購量', field: 'poQty', editable: true, resizable: true, type: 'numericColumn', sortable: true, width: 100},
    { headerName:'計量單位', field: 'stkUnit', editable: true, resizable: true},
    { headerName:'單價', field: 'price', editable: true, resizable: true, type: 'numericColumn', sortable: true},
    { headerName:'計價單位', field: 'purUnit', editable: true, resizable: true},
    { headerName:'金額', field: 'amount', editable: true, resizable: true, type: 'numericColumn', sortable: true},
    { headerName:'預交日期', field: 'preDate', editable: true, resizable: true, sortable: true},
    { headerName:'結案', field: 'endCode', editable: true, resizable: true}
];



  constructor() {
    console.log('fff');
    
   }

  ngOnInit(): void {
  }

  onFirstDataRendered(params: any) {
    // console.log(params);
    
    // params.api.sizeColumnsToFit();
  }
  
}
