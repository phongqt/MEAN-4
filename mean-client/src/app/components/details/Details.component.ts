import { Component, Input } from '@angular/core';  
  
@Component({  
    moduleId: module.id,  
    selector: 'employee-details',  
    templateUrl: 'details.component.html',  
      
})  
export class detailsComponent {  
    @Input() employee;
    @Input() isShowSaveButton
}  