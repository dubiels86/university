import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { createPopper } from "@popperjs/core";

@Component({
  selector: "app-table-dropdown-car",
  templateUrl: "./table-dropdown-car.component.html",
})
export class TableDropdownCarComponent implements AfterViewInit {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  @Output() removeValueChange = new EventEmitter()
  popoverDropdownRef: ElementRef;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  /**
   * Removes a row
   * @param row Row to be edited
   */
   async removeValueChanged(row) {
    await this.removeValueChange.emit(row.id);
  }
 
}
