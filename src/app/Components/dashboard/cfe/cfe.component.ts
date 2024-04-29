import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {User} from "../../../Models/users";
import {UserService} from "../../../Services/user.service";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import {TvaService} from "../../../Services/tva.service";
import {CfeService} from "../../../Services/cfe.service";
import {Cfe} from "../../../Models/Cfe";
import {MatFormField, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-cfe',
  standalone: true,
  imports: [FormsModule, DatePipe, NgIf, NgForOf, MatLabel, MatFormField, MatSelect, MatOption],

  templateUrl: './cfe.component.html',
  styleUrl: './cfe.component.css'
})
export class CfeComponent {
  cfes: Cfe[] = [];
  selectedCfeId?: number;
  cfe: Cfe = new Cfe();
  editMode: boolean = false;
  addMode: boolean = false;

  constructor(private cfeService: CfeService) {
    this.fetchAllCFE();
  }

  fetchAllCFE() {
    this.cfeService.getAll().subscribe(data => {
      if (data && data.length > 0) {
        this.cfes = data;
        this.cfe = this.cfes[0]; // Assume selecting the first for simplicity
        this.selectedCfeId = this.cfe.id;
        this.selectCFE();
      }
    }, error => {
      console.error(error);
    });
  }

  selectCFE() {
    if (this.selectedCfeId) {
      this.cfeService.get(this.selectedCfeId).subscribe(cfe => {
        this.cfe = cfe;
        this.editMode = false; // Reset edit mode
      }, error => {
        console.error(error);
      });
    }
  }

  saveOrUpdateCFE() {
    if (this.cfe.id) {
      this.cfeService.Update(this.cfe.id, this.cfe).subscribe(() => {
        this.fetchAllCFE();
        this.editMode = false;
      }, error => {
        console.error(error);
      });
    } else {
      this.cfeService.Create(this.cfe).subscribe(() => {
        this.fetchAllCFE();
        this.addMode = false;
      }, error => {
        console.error(error);
      });
    }
  }

  deleteCFE() {
    if (this.selectedCfeId) {
      this.cfeService.Delete(this.selectedCfeId).subscribe(() => {
        this.fetchAllCFE();
      }, error => {
        console.error(error);
      });
    }
  }

  addNewCFE() {
    this.cfe = new Cfe();
    this.addMode = true;
    this.editMode = false;
  }

  cancelEdit() {
    this.addMode = false;
    this.editMode = false;
    this.fetchAllCFE();
  }
  selectedFile: File | null = null;

  generatePDF(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files ? target.files[0] : null;
    if (this.selectedFile && this.selectedCfeId) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.cfeService.generatePDF(formData, this.selectedCfeId).subscribe((response: Blob) => {
        const url = window.URL.createObjectURL(response);
        window.open(url, '_blank');
        window.location.reload();
      }, (error) => {
        console.error('Error generating PDF:', error);
        alert('Wrong file format. Please upload a PDF file.');
      });
    }
  }
}
