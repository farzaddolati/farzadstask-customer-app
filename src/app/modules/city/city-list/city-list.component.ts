import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','actions'];
  dataSource!: MatTableDataSource<City>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cityService: CityService,private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.cityService.getCities().subscribe(cities => {
      this.dataSource = new MatTableDataSource(cities);
      console.log(cities);
      this.dataSource.paginator = this.paginator;
    });
  }  
  
  deleteCity(cityId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {      
        this.cityService.deleteCity(cityId).subscribe(() => {
              const index = this.dataSource.data.findIndex(city => city.id === cityId);
              if (index >= 0) {
                this.dataSource.data.splice(index, 1);
                this.dataSource._updateChangeSubscription();
              }
            });
      }
    });
  }

  editCity(id: number) {
    this.router.navigate(['/edit-city', id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 

  goToAddCity() {
    this.router.navigate(['/add-city']);
  }

}