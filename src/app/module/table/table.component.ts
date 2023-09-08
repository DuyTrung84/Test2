import { Component, Input, OnInit, Output } from '@angular/core';
import { IEmployee } from 'src/app/interface/employee';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  confirmModal?: NzModalRef; // For testing by now
  selectedEmployeeId: string | null = null;
  searchTerm: string = '';
  searchResults: IEmployee[] = [];
  listOfOriginalData: IEmployee[] = [];

  constructor(private modal: NzModalService) { }
  @Output() listOfData: IEmployee[] = [
    { employeeId: this.generateRandomEmployeeId(), name: 'Nguyễn Văn A', type: 'NV3', phone: '0123456789', email: 'ahihi123@gmail.com', status: 'Inactive' },
    { employeeId: this.generateRandomEmployeeId(), name: 'Nguyễn Văn B', type: 'NV1', phone: '0123456789', email: 'trung123@gmail.com', status: 'Inactive' }
  ];



  generateRandomEmployeeId(): string {
    // Tạo một chuỗi ngẫu nhiên dựa trên thời gian hiện tại
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    // Kết hợp chuỗi ngẫu nhiên và timestamp để tạo mã nhân viên
    const employeeId = `NV${timestamp}${randomPart}`;

    return employeeId;
  }
  visible = false;
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  changeStatusButton(employeeId: string): void {
    const employee = this.listOfData.find((emp) => emp.employeeId === employeeId);

    if (employee) {
      employee.status = employee.status === 'Active' ? 'Inactive' : 'Active';
    }

  }

  statusConfirm(employeeId: string): void {
    const employee = this.listOfData.find((emp) => emp.employeeId === employeeId);
    const title: string = employee?.status === "Active" ? 'Khóa nhân viên' : 'Mở khóa nhân viên'
    const content: string = employee?.status === "Active" ? 'Bạn có muốn Khóa nhân viên không?' : 'Bạn có muốn mở khóa nhân viên không?'
    this.confirmModal = this.modal.confirm({
      nzTitle: title,
      nzContent: content,
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.changeStatusButton(employeeId);
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
  deleteEmployee(employeeId: string) {
    this.listOfData = this.listOfData.filter((employee) => employee.employeeId !== employeeId);
  }
  deleteConfirm(employeeId: string): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa nhân viên',
      nzContent: 'Bạn có muốn xóa nhân viên không?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.deleteEmployee(employeeId);
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
  editEmployee(employeeId: string): void {
    this.selectedEmployeeId = employeeId;
    this.open();
  }

  search() {
    this.listOfOriginalData = [...this.listOfData];
    this.searchResults = this.listOfData.filter(item => item.name.includes(this.searchTerm));
    console.log(this.searchResults);
  }
  resetSearch() {
    this.searchTerm = '';
    this.searchResults = [];
    this.listOfData = [...this.listOfOriginalData];
  }
}

