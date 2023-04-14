import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExistinguserComponent } from './existinguser/existinguser.component';
import { NewuserComponent } from './newuser/newuser.component';


const routes: Routes = [
  {path:'', component:DashboardComponent},
  { path: 'newuser', component: NewuserComponent },
  { path: 'existinguser', component: ExistinguserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }