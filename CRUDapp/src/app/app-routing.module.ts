import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { ListRegistrationComponent } from './list-registration/list-registration.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [

  {path:'', redirectTo:'register', pathMatch:'full'},
  {path:'register', component:CreateRegistrationComponent},
  {path: 'update/:id', component:CreateRegistrationComponent},
  {path:'list', component: ListRegistrationComponent},
   {path: 'detail/:id', component: UserDetailComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
