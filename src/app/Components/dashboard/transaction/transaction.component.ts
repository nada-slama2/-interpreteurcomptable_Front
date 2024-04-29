import { Component } from '@angular/core';
import { TransactionService } from "../../../Services/transaction.service";
import { Transaction } from "../../../Models/Transaction";
import {FormsModule} from "@angular/forms";
import {DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, DatePipe, JsonPipe]
})
export class TransactionComponent {
  transactions: Transaction[] = [];
  transaction: Transaction = new Transaction();
  editMode: boolean = false;
  addMode: boolean = false;
  selectedTransactionId?: number;

  constructor(private transactionService: TransactionService) {
    this.fetchAllTransactions();
  }

  fetchAllTransactions() {
    this.transactionService.getAll().subscribe(data => {
      this.transactions = data;
      if (data && data.length > 0) {
        this.transaction = data[0];  // Automatically select the first Transaction
        this.selectedTransactionId = this.transaction.id;
      }
    }, error => {
      console.error(error);
    });
  }

  selectTransaction() {
    if (this.selectedTransactionId) {
      this.transactionService.get(this.selectedTransactionId).subscribe(transaction => {
        this.transaction = transaction;
        this.editMode = false;
        this.addMode = false;
      }, error => {
        console.error(error);
      });
    }
  }

  saveOrUpdateTransaction() {
    if (this.transaction.id) {
      this.transactionService.Update(this.transaction.id, this.transaction).subscribe(() => {
        this.fetchAllTransactions();
        this.editMode = false;
        this.addMode = false;
      }, error => {
        console.error(error);
      });
    } else {
      this.transactionService.Create(this.transaction).subscribe(() => {
        this.fetchAllTransactions();
        this.addMode = false;
      }, error => {
        console.error(error);
      });
    }
  }

  deleteTransaction() {
    if (this.selectedTransactionId) {
      this.transactionService.Delete(this.selectedTransactionId).subscribe(() => {
        this.fetchAllTransactions();
      }, error => {
        console.error(error);
      });
    }
  }

  addNewTransaction() {
    this.transaction = new Transaction(); // Reset Transaction object
    this.addMode = true;
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
    this.addMode = false;
  }
}
