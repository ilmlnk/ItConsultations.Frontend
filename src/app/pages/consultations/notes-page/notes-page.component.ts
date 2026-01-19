import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'cons-notes-page',
  standalone: false,
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.scss'
})
export class NotesPageComponent implements OnInit {
  viewOptions: any[] = [
    { value: 'expanded', icon: 'pi pi-table', label: 'Grid' },
    { value: 'compact', icon: 'pi pi-list', label: 'List' }
  ];
  selectedViewOption: string = 'expanded';
  searchValue: string = '';
  selectedNotes: any[] = [];
  exportItems: MenuItem[] = [];

  rowsOptions: number[] = [10, 20, 50];
  rows: number = 10;
  first: number = 0;

  notes: any[] = [
    { id: 1, name: 'Project Requirements.docx', date: new Date('2023-10-25'), type: 'doc' },
    { id: 2, name: 'Meeting Notes 2023-10-20.txt', date: new Date('2023-10-20'), type: 'txt' },
    { id: 3, name: 'Architecture Diagram.pdf', date: new Date('2023-10-15'), type: 'pdf' },
    { id: 4, name: 'Frontend Checklist.xlsx', date: new Date('2023-10-10'), type: 'xls' },
    { id: 5, name: 'Design Assets.zip', date: new Date('2023-10-05'), type: 'zip' },
    { id: 6, name: 'API Documentation.md', date: new Date('2023-10-01'), type: 'code' },
  ];

  ngOnInit() {
    this.exportItems = [
      { label: 'PDF', icon: 'pi pi-file-pdf', command: () => this.exportPdf() },
      { label: 'XLSX', icon: 'pi pi-file-excel', command: () => this.exportExcel() },
      { label: 'CSV', icon: 'pi pi-file', command: () => this.exportCsv() }
    ];
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  exportPdf() { console.log('Export PDF', this.selectedNotes); }
  exportExcel() { console.log('Export Excel', this.selectedNotes); }
  exportCsv() { console.log('Export CSV', this.selectedNotes); }

  getFileIcon(type: string): string {
    switch (type) {
      case 'pdf': return 'pi-file-pdf';
      case 'xls':
      case 'xlsx': return 'pi-file-excel';
      case 'doc':
      case 'docx': return 'pi-file-word';
      case 'zip':
      case 'rar': return 'pi-folder';
      case 'code': return 'pi-code';
      case 'txt': return 'pi-file';
      default: return 'pi-file';
    }
  }
}
