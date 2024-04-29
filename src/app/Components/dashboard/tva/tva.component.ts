import { Component } from '@angular/core';
import { FormsModule,  } from "@angular/forms";
import { Tva } from "../../../Models/Tva";
import { TvaService } from "../../../Services/tva.service";
import {DatePipe, JsonPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-tva',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    FormsModule,
    DatePipe
  ],
  templateUrl: './tva.component.html',
  styleUrls: ['./tva.component.css']  // Corrected to styleUrls and should be an array
})
export class TvaComponent {
  tva: Tva ={
    abservice: 0,
    aoi: 0,
    creationDate: new Date(),
    id: 0,
    taxAss: 0,
    totPayer: 0,
    totTvaBruteDue: 0,
    totTvaDed: 0,
    totTvaDue: 0,
    tvaBrute10: 0,
    tvaBrute20: 0,
    tvaBrute55: 0,
    tvaNetDue: 0,
    vente: 0

  };

  constructor(private tvaService: TvaService) {
    tvaService.getAll().subscribe((data: Tva) => {
        this.tva = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      });
  }
  selectedFile: File | null = null;

  saveTva(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files ? target.files[0] : null;
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.tvaService.generatePDF(formData).subscribe({
        next: (response: Blob) => {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        },
        error: (err) => {
          console.error('Error downloading the file:', err);
          alert('Failed to download file.');
        }
      });
    }
  }
}
