import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
 
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource!: MatTableDataSource<Customer>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private customerService: CustomerService,private router: Router) { }

  ngOnInit(): void {
    
    this.customerService.getCustomers().subscribe(customers => {
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.paginator = this.paginator;
    });
  }
  
  deleteCustomer(customerId: number) {
    this.customerService.deleteCustomer(customerId).subscribe(() => {
      const index = this.dataSource.data.findIndex(customer => customer.id === customerId);
      if (index >= 0) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  editCustomer(id: number) {
    this.router.navigate(['/edit-customer', id]);
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  goToAddCustomer() {
    this.router.navigate(['/add-customer']);
  }

}