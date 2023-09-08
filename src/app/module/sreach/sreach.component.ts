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

  search() {
    this.listOfData = this.listOfData.filter(item => item.name.includes(this.searchTerm));
    console.log(this.listOfData);
  }
}
