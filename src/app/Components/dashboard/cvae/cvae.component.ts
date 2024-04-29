import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CvaeService } from "../../../Services/cvae.service";
import { Cvae } from "../../../Models/Cvae";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-cvae',
  standalone: true,
  imports: [FormsModule, DatePipe, NgIf, NgForOf, MatLabel, MatFormField, MatSelect, MatOption],
  templateUrl: './cvae.component.html',
  styleUrls: ['./cvae.component.css']
})
export class CvaeComponent {
  cvaes: Cvae[] = [];
  selectedCvaeId?: number;
  cvae: Cvae = new Cvae();
  editMode: boolean = false;
  addMode: boolean = false;

  constructor(private cvaeService: CvaeService) {
    this.fetchAllCVAE();
  }

  fetchAllCVAE() {
    this.cvaeService.getAll().subscribe(data => {
      if (data && data.length > 0) {
        this.cvaes = data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.cvae = this.cvaes[0];  // Automatically select the CVAE with the latest date
        this.selectedCvaeId = this.cvae.id;
        this.selectCVAE();
      }
    }, error => {
      console.error(error);
    });
  }

  selectCVAE() {
    if (this.selectedCvaeId) {
      this.cvaeService.get(this.selectedCvaeId).subscribe(cvae => {
        console.log(cvae);
        this.cvae = cvae;
        this.editMode = false; // Reset edit mode
      }, error => {
        console.error(error);
      });
    }
  }

  saveOrUpdateCVAE() {
    if (this.cvae.id) {
      this.cvaeService.Update(this.cvae.id, this.cvae).subscribe(() => {
        this.fetchAllCVAE();
        this.editMode = false;
      }, error => {
        console.error(error);
      });
    } else {
      this.cvaeService.Create(this.cvae).subscribe(() => {
        this.fetchAllCVAE();
        this.addMode = false;
      }, error => {
        console.error(error);
      });
    }
  }

  deleteCVAE() {
    if (this.selectedCvaeId) {
      this.cvaeService.Delete(this.selectedCvaeId).subscribe(() => {
        this.fetchAllCVAE();
      }, error => {
        console.error(error);
      });
    }
  }

  addNewCVAE() {
    this.cvae = new Cvae();
    this.addMode = true;
    this.editMode = false;
  }

  cancelEdit() {
    this.addMode = false;
    this.editMode = false;
    this.fetchAllCVAE();
  }


  selectedFile: File | null = null;

  generatePDF(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files ? target.files[0] : null;
    if (this.selectedFile && this.selectedCvaeId) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.cvaeService.generatePDF(formData, this.selectedCvaeId).subscribe((response: Blob) => {
        console.log(response);
        const url = window.URL.createObjectURL(response);
        window.open(url, '_blank');
        this.selectedFile = null;
        window.location.reload();
      }, (error) => {
        console.error('Error generating PDF:', error);
        alert('Wrong file format. Please upload a PDF file.');
      });
    }

  }
}
