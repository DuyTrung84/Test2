import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { IEmployee } from 'src/app/interface/employee';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() listOfData: IEmployee[] = [];
  constructor(
    private fb: UntypedFormBuilder,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) { }

  validateForm!: UntypedFormGroup;
  isVisible = false;
  placement = 'top';
  titleNotification: string = '';
  contentNotification: string = '';

  @Input() selectedEmployeeId: string | null = null;

  generateRandomEmployeeId(): string {
    // Tạo một chuỗi ngẫu nhiên dựa trên thời gian hiện tại
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    // Kết hợp chuỗi ngẫu nhiên và timestamp để tạo mã nhân viên
    const employeeId = `NV${timestamp}${randomPart}`;

    return employeeId;
  }
  ngOnInit(): void {
    if (this.selectedEmployeeId) {
      const selectedEmployee = this.listOfData.find((employee) => employee.employeeId === this.selectedEmployeeId);

      if (selectedEmployee) {
        this.validateForm = this.fb.group({
          employeeId: [selectedEmployee.employeeId],
          email: [selectedEmployee.email, [Validators.email, Validators.required]],
          name: [selectedEmployee.name, [Validators.required]],
          phone: [selectedEmployee.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
          type: [selectedEmployee.type, [Validators.required]],
          status: [selectedEmployee.status, [Validators.required]],
        });
      }
    } else {
      this.validateForm = this.fb.group({
        employeeId: [''],
        email: [null, [Validators.email, Validators.required]],
        name: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
        type: ['NV1', [Validators.required]],
        status: ['Inactive', [Validators.required]],
      });
    }
  }


  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.selectedEmployeeId) {
        const updateEmployee: IEmployee = {
          employeeId: this.selectedEmployeeId,
          name: this.validateForm.value.name,
          type: this.validateForm.value.type,
          phone: this.validateForm.value.phone,
          email: this.validateForm.value.email,
          status: this.validateForm.value.status,
        };

        const index = this.listOfData.findIndex((employee) => employee.employeeId === this.selectedEmployeeId);
        if (index !== -1) {
          this.listOfData[index] = updateEmployee;
        }
        this.createBasicNotification('Sửa thành công')
      } else {
        const newEmployee: IEmployee = {
          employeeId: this.generateRandomEmployeeId(),
          name: this.validateForm.value.name,
          type: this.validateForm.value.type,
          phone: this.validateForm.value.phone,
          email: this.validateForm.value.email,
          status: this.validateForm.value.status,
        };

        this.listOfData.push(newEmployee);
        this.createBasicNotification('Thêm thành công')
        this.validateForm.reset();
      }

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.createMessage('error')
    }
  }

  createMessage(type: string): void {
    this.message.create(type, `${type}`);
  }


  createBasicNotification(message: string): void {
    this.notification.blank(
      message,
      '',
      { nzPlacement: 'top' }
    );
  }
}
