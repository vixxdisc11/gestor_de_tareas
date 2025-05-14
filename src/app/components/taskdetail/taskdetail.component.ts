import {Component, OnInit} from '@angular/core';
import {StaskService} from '../../services/stask.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {LogoutService} from '../../services/logout.service';
@Component({
  selector: 'app-taskdetail',
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    ReactiveFormsModule,

  ],
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent implements OnInit {
  task: any = null;
  users: any[] = [];
  asign: any[] = [];
  loged: any;
  asigned: boolean = false;
  id: number;
  comments: any[] = [];
  taskid: FormControl;
  user_id: FormControl;
  contenido: FormControl;
  addcoment: any;
  addasign: any;
  delassign: FormGroup;
  addass: FormGroup;

  //us_id: FormControl;
  deleted: any[] = [];

  protected isLoading:boolean = true;
  constructor(public taskService: StaskService,public logoutService: LogoutService, public authService: AuthService, private route: ActivatedRoute) {

    this.id = Number(this.route.snapshot.params['id']);


    this.taskid = new FormControl(this.id);
    this.user_id = new FormControl('');
    this.contenido = new FormControl('');
    this.addcoment = new FormGroup({
      task_id: this.taskid,
      user_id: this.user_id,
      contenido: this.contenido,
    });

    this.delassign = new FormGroup({
      task_id: new FormControl(this.id),
      idborrar: new FormControl(null),
    });

    this.addass = new FormGroup({
      task_id: this.taskid,
      user_id: new FormControl(null),
    });
  }


  async idasign2(userId: string) {
    this.delassign.controls['idborrar'].setValue(userId);
    const usid = this.delassign.get('idborrar')?.value;
    console.log(usid);
    this.deleted = await this.taskService.delUsers(this.id, usid);
    this.getAssig().then()
  }

  async idasign3(userId: string) {
    this.addcoment.controls['user_id'].setValue(userId);
    const usid = this.delassign.get('user_id')?.value;
    console.log(usid);

  }
  deltok():void{
    this.logoutService.delAuthToken();
  }

  async Postcomment() {
    await this.addComment(this.addcoment.value);
    console.log(this.addcoment.value)
    this.addcoment.reset();
  }

  async addComment(comment: any): Promise<void> {
    this.addcoment = await this.taskService.insertComment(comment);
    await this.getcomment();
  }

  async postAssign() {
    console.log(this.addass.value)
    this.addasign = await this.taskService.insertAssign(this.id, this.addass.value);
    this.addass.get('user_id')?.reset();
    this.getAssig().then();
    this.getUnassigned().then();
  }


  isVisible: boolean = false;


  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    console.log('Visibilidad cambiada a:', this.isVisible);

  }

  // ngOnInit(): void {
  //
  // }
  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.getTask();
    await this.getcomment();
    await this.getUnassigned();
    await this.getAssig();
    await this.getloged();
    this.isitasigned();
    this.isLoading = false;
  }

  async getcomment() {

    this.comments = await this.taskService.getcomments();
    console.log(this.comments);
  }


  async changeStatus(task: any): Promise<void> {
    console.log(task);
    const url = `http://127.0.0.1:8000/api/tasks/status/${task.id}`;
    const payload = {status: task.status};
    await this.taskService.editstatus(url, payload);
  }


  async getTask() {
    this.task = await this.taskService.getTask(this.id);
    // this.loged = await this.authService.getinfo();
    // console.log(this.loged);

  }

  async getUnassigned() {
    this.users = await this.taskService.getUnAssigned(this.id);

  }

  async getloged(): Promise<void> {
    try {
      this.loged = await this.authService.getinfo(); // sin tocar la respuesta
      console.log('Usuario logeado:', this.loged);
    } catch (error) {
      console.error('Error al obtener el usuario logeado:', error);
    }
  }

  async getAssig() {
    this.asign = await this.taskService.getAssigned(this.id);
    console.log(this.asign);
  }

  isitasigned() {
    this.asigned = !!this.asign.find(a => a.id === this.loged.id);
  }
}



