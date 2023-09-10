import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployee } from 'src/app/interface/employee';

@Component({
  selector: 'app-sreach',
  templateUrl: './sreach.component.html',
  styleUrls: ['./sreach.component.css']
})
export class SreachComponent {
  @Input() listOfData: IEmployee[] = [];
  searchTerm: string = '';
  searchResults: IEmployee[] = [];
  listOfOriginalData: IEmployee[] = [];
  selectedSearchField: string = 'disabled';

  search() {
    this.listOfOriginalData = [...this.listOfData];
    switch (this.selectedSearchField) {
      case 'email':
        this.searchResults = this.listOfData.filter(item => item.email?.includes(this.searchTerm));
        break;
      case 'type':
        this.searchResults = this.listOfData.filter(item => item.type.includes(this.searchTerm));
        break;
      case 'phone':
        this.searchResults = this.listOfData.filter(item => item.phone.includes(this.searchTerm));
        break;
      case 'employeeId':
        this.searchResults = this.listOfData.filter(item => item.employeeId?.includes(this.searchTerm));
        break;
      default:
        this.searchResults = this.listOfData.filter(item => item.name.includes(this.searchTerm));
        break;
    }
    console.log(this.searchResults);

  }

  resetSearch() {
    this.searchTerm = '';
    this.searchResults = [];
    this.listOfData = [...this.listOfOriginalData];

    console.log(this.listOfData);

  }
}
