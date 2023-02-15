import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminsComponent } from './layouts/admins/admins.component';
import { AuthsComponent } from './layouts/auths/auths.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: '',
    component: AdminsComponent,
    // canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import("./../app/layouts/admins/admins.module").then(e => e.AdminsModule)
    }]
  },
  {
    path: '',
    component: AuthsComponent,
    children: [{
      path: '',
      loadChildren: () => import("./../app/layouts/auths/auths.module").then(e => e.AuthsModule)
    }]
  },
  { path:"products" , children: [
    {path :"", component:ProductsComponent},
    {path :"categories", component:CategoriesComponent},
  ]},
  
  
  
  
  {
    path: '**',
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
