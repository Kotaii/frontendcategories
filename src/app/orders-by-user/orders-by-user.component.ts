import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Orders } from '../models/orders';
import { Users } from '../models/users';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-orders-by-user',
  templateUrl: './orders-by-user.component.html',
  styleUrls: ['./orders-by-user.component.css']
})
export class OrdersByUserComponent implements OnInit {

  orders: Orders[] = [];
  userOrdersBool: boolean = true;
  loader: boolean = false;
  user: Users | undefined;
  userId!: number;

  
  constructor(
    private fb: FormBuilder,
    private db: DbService,
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toast: ToastrService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.activateRoute.snapshot.paramMap;
    //const userIdFromRoute = Number(routeParams.get('userId'));
    this.activateRoute.params.subscribe(
      param => {
        this.userId = param['userId']
        });
    this.db.getOrdersByUserid(this.userId);
    this.db.orders.subscribe((list) => {
      if(list.length !== 0) this.orders = list;
    });
    // this.categoryObservable = this.httpClient.get<any[]>("./../../assets/json/categories.json");
}


   refreshpage(){
   
  window.location.reload();
  
  }


}


