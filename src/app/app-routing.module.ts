import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationsModule } from './pages/consultations.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), ConsultationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
