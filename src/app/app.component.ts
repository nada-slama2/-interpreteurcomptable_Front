import {Component, ElementRef, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'interpreteurComptableFront';
}
