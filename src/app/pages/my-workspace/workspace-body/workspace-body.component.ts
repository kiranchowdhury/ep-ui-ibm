import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { SearchResult } from './search-result-mock';
import { SearchCriteria } from '../saved-criteria/search-criteria.state';

@Component({
  selector: 'ep-workspace-body',
  templateUrl: './workspace-body.component.html',
  styleUrls: ['./workspace-body.component.scss']
})
export class WorkspaceBodyComponent implements OnInit {
  @Input() selectedSearch: SearchCriteria;
  gridOptions: GridOptions;
  showGrid: boolean;
  rowData: any[];
  // rowHeight: any;
  columnDefs: any[];
  rowCount: string;
  gridApi;
  gridColumnApi;
  autoGroupColumnDef;
  defaultColDef;

  constructor() {
    this.gridOptions = <GridOptions>{};
    this.rowData = SearchResult.RESULTS;
    this.createColumnDefs();
    this.showGrid = true;
    this.autoGroupColumnDef = {
      headerName: 'Group',
      width: 200,
      field: 'quoteid',
      valueGetter: function(params) {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      }
    }
    this.defaultColDef = {
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true
    };
  }

  ngOnInit() {
  }
  createColumnDefs() {
    this.columnDefs = [
    {
      headerName: '#', width: 60, checkboxSelection: true, suppressSorting: true, pinned: 'left',
      menuTabs: ['generalMenuTab']
    },
    {
      headerName: 'Quote Id', field: 'quoteid',
      width: 150, pinned: 'left',
      menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
    },
    {
      headerName: 'Country', field: 'ctrycode',
      width: 150,
      menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
    },
    {
        headerName: 'Quote Type', field: 'creatortype',
        width: 150,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
    },
    {
        headerName: 'EU Customer', field: 'ctmttcuccompanyname1',
        width: 150,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
    },
    {
        headerName: 'Quote Status', field: 'quotestatus',
        width: 150,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
    },
    {
        headerName: 'Order Status', field: 'orderstatus',
        width: 150,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
    },
    {
        headerName: 'Brand', field: 'brandcode',
        width: 150,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
    },
    {
        headerName: 'List Price', field: 'listprice',
        width: 150,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
    },
    {
        headerName: 'Quoted Price', field: 'approvedprice',
        width: 150,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
    },
    {
        headerName: 'Tier1 Name', field: 'ctmttcubcompanyname1',
        width: 150,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
    },
    {
        headerName: 'Tier2 Name', field: 'ctmttcudcompanyname1',
        width: 150,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
    },
    {
        headerName: 'Creation Date', field: 'ctmttdattranscreatedate',
        width: 150,
        menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
    }]
  }
   calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
        const model = this.gridOptions.api.getModel();
        const totalRows = this.rowData.length;
        const processedRows = model.getRowCount();
        this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
}
     onModelUpdated() {
        console.log('onModelUpdated');
        this.calculateRowCount();
    }
    autoSizeAll() {
        const allColumnIds = [];
        this.gridColumnApi.getAllColumns().forEach(function(column) {
          allColumnIds.push(column.colId);
        });
        this.gridColumnApi.autoSizeColumns(allColumnIds);
      }
    public onReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.autoSizeAll();
        console.log('onReady');
        // params.api.sizeColumnsToFit();
        this.calculateRowCount();
    }

     onCellClicked($event) {
        console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

     onCellValueChanged($event) {
        console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
    }

     onCellDoubleClicked($event) {
        console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

     onCellContextMenu($event) {
        console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

     onCellFocused($event) {
        console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
    }

     onRowSelected($event) {
        // taking out, as when we 'select all', it prints to much to the console!!
        // console.log('onRowSelected: ' + $event.node.data.name);
    }

     onSelectionChanged() {
        console.log('selectionChanged');
    }

     onBeforeFilterChanged() {
        console.log('beforeFilterChanged');
    }

     onAfterFilterChanged() {
        console.log('afterFilterChanged');
    }

     onFilterModified() {
        console.log('onFilterModified');
    }

     onBeforeSortChanged() {
        console.log('onBeforeSortChanged');
    }

     onAfterSortChanged() {
        console.log('onAfterSortChanged');
    }

     onVirtualRowRemoved($event) {
        // because this event gets fired LOTS of times, we don't print it to the
        // console. if you want to see it, just uncomment out this line
        // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
    }

     onRowClicked($event) {
        console.log('onRowClicked: ' + $event.node.data.name);
    }

     onQuickFilterChanged($event) {
        console.log('onQuickFilterChanged');
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
     onColumnEvent($event) {
        console.log('onColumnEvent: ' + $event);
    }
}
