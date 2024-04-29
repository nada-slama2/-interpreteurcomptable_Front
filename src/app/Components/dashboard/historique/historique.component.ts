import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {HistoriqueService} from "../../../Services/historique.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {
  historiques: any[] = [];
  constructor(private historiqueService: HistoriqueService) {
    this.historiqueService.getAll().subscribe(data => {
        if (data && data.length > 0) {
          this.historiques = data;
          console.log(data);
        }
      },
      error => {
        console.error(error);
      });
  }

  downloadFile(fileId: number): void {
    this.historiqueService.downloadFile(fileId).subscribe({
      next: (response: Blob) => {
        console.log(response)
        const url = window.URL.createObjectURL(response);
        window.open(url, '_blank');
      },
      error: (err) => {
        console.error('Error downloading the file:', err);
        alert('Failed to download file.');
      }
    });
  }
}
