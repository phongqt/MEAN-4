import { Component, Input } from '@angular/core';  
  
@Component({  
    moduleId: module.id,  
    selector: 'employee-details',  
    templateUrl: 'employee.details.component.html',  
      
})  
export class DetailsEmployeeComponent {  
    @Input() employee;
}  