import {Component, OnInit} from '@angular/core';
import {StaskService} from '../../services/stask.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {LogoutService} from '../../services/logout.service';
import {AvisosService} from '../../services/avisos.service';

@Component({
  selector: 'app-task',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule

  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  tareaForm: any;
  loged: any;
  avisos: any;
  delf: any;
  nombre:any;
  tasks: any[] = [];
  status: FormControl;
  title: FormControl;
  description: FormControl;
  created_by: FormControl;
  id: FormControl;
  loged2:any;
  duracion:any;
  comper:any;
  userid:any;
  storedLoged:any;
  protected isLoading:boolean = true;
  opcion = {
    not: false,
    doing: false,
    done: false
  };
  public filters: {
    status: 'Done' | 'Doing' | 'Not Started' | null
  } = {status: null};
  constructor(public AvisosService:AvisosService,public router: Router,public logoutService:LogoutService,public taskService: StaskService,private route: ActivatedRoute,private fb: FormBuilder ,public authService: AuthService ) {

    const taskid = this.route.snapshot.params['id'];
    this.title= new FormControl('',Validators.required);
    this.description= new FormControl('',Validators.required);
    this.status= new FormControl('not_started');
    this.created_by= new FormControl();
    this.id=new FormControl('');
    this.delf=new FormGroup({
      taskid: this.id
    });

    this.tareaForm = new FormGroup({
      title: this.title,
      description: this.description,
      status: this.status,
      created_by: this.created_by,
    });

  }
  ngOnInit(): void {

    this.isLoading = true;
    this.getloged().then();
    this.gettask();
    this.isLoading = false;

  }
  async getavisos():Promise<void>{

    this.loged2=this.loged[0].id;
    console.log(this.loged2)
    this.nombre = this.loged[0].name;
    this.avisos = await this.AvisosService.getaviso(this.loged2);
    console.log('avisos' + this.avisos)

  }
  async getloged(): Promise<void> {
    try {
      const respuesta = await this.authService.getinfo();
      this.loged = Array.isArray(respuesta) ? respuesta : [respuesta]; // asegura que sea array
      console.log('Usuarios cargados:', this.loged);
      this.tareaForm.controls.created_by.setValue(this.loged[0].id)
      //AVISOS
      this.getavisos();
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  }
  async delaviso(id:number): Promise<void>{
    try {
      await this.AvisosService.delete(id);
      console.log(`Aviso con ID ${id} eliminado correctamente.`);
      await this.getavisos().then();
    } catch (error) {
      console.error('Error al eliminar el aviso:', error);
    }
  }
  async decrease(id:number,userid:number,duracion:number,contenido:string): Promise<void>{
    duracion=duracion-1;
    console.log(duracion)
    const body = {
      user_id: userid,
      duracion: duracion ,
      contenido: contenido
    };
    console.log(body)

    try {
      await this.AvisosService.decrease(id,body);
      console.log(`Aviso con ID ${id} modifico su duracion`);
      if (body.duracion == 0){
        await this.delaviso(id);
      }
      // await this.getavisos().then();
      this.quitavisos();
    } catch (error) {
      console.error('Error al modificar la duracion', error);
    }
  }
  goperfil(id:number){
    this.router.navigate(['perfil/'+id]);
  }
 quitavisos (){
    this.avisos=[];
  }
  async filtrar(): Promise<void> {
    switch (this.filters.status) {
      case 'Not Started':
        this.tasks = (await this.taskService.getNotStarted())?.tasks ?? [];
        break;
      case 'Doing':
        this.tasks = (await this.taskService.getDoings())?.tasks ?? [];
        break;
      case 'Done':
        this.tasks = (await this.taskService.getDones())?.tasks ?? [];
        break;
      case null:
        this.tasks = await this.taskService.gettasks();
        break;
    }
  }

  setStatusFilter(status: 'Done' | 'Doing' | 'Not Started' | null):void {
    if (this.filters.status === status) {
      this.filters.status = null;
    } else {
      this.filters.status = status;
    }
    this.filtrar().then();
  }

  async Posttask(){
    // this.userid = id;
    console.log(this.tareaForm.value);
    await this.createTask(this.tareaForm.value);
    this.tareaForm.reset();
    this.gettask();
  }
  async createTask(tarea: any){
    this.tareaForm = await this.taskService.createTask(tarea);
    this.gettask();
  }

  async deltask(id:number){
    this.delf = await this.taskService.deletetask(id);
    this.gettask();
  }
  deltok():void{
    this.logoutService.delAuthToken();
  }
  admin():void{
    this.router.navigate(['admin-panel']);
  }

  async gettask() {
    this.tasks = await this.taskService.gettasks();
    console.log('1')
    console.log(this.tasks);
  }


}



