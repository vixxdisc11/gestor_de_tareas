import {Routes} from '@angular/router';
import {TaskComponent} from './components/task/task.component';
import {TaskdetailComponent} from './components/taskdetail/taskdetail.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './guards/AuthGuardService';
import {RegisterComponent} from './components/register/register.component';
import {ControlpanelComponent} from './components/controlpanel/controlpanel.component';
import {UserdetailsComponent} from './components/userdetails/userdetails.component';
import {PerfilComponent} from './components/perfil/perfil.component'; // Ensure the file exists and the export is correct

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/r',
    component: RegisterComponent
  },
  {
    path: 'admin-panel',
    component: ControlpanelComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin-panel/:id',
    component: UserdetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tasks/:id/logout',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tasks/logout',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'perfil/:id',
    component: PerfilComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'tasks/:id',
    component: TaskdetailComponent,
    canActivate: [AuthGuardService]
  }



];



