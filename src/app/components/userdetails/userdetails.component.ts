import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {StaskService} from '../../services/stask.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LogoutService} from '../../services/logout.service';
import {AvisosService} from '../../services/avisos.service';


@Component({
  selector: 'app-userdetails',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent implements OnInit{
  comments: any[] = [];
  asigned: any[] = [];
  aviso:any;
  avisos:any;
  id: number;
  loged: any;
  deleted:any;
  avisosform: FormGroup;
  user_id:FormControl;
  duracion:FormControl;
  contenido:FormControl;
  delav: any;
  constructor(public AvisosService:AvisosService, public router: Router,public taskService: StaskService,public logoutService: LogoutService,  private route: ActivatedRoute,public authService: AuthService) {
    this.id = Number(this.route.snapshot.params['id']);
    this.user_id = new FormControl(this.id);
    this.duracion = new FormControl('');
    this.contenido = new FormControl('');
    this.avisosform = new FormGroup({
      user_id: this.user_id,
      duracion: this.duracion,
      contenido: this.contenido
    });
  }
  async ngOnInit(): Promise<void> {
    await this.getcomment();
    await this.getcusertasks();
    await this.getloged();
    await this.getavisos().then();
  }
  async createaviso():Promise<void>{
    console.log(this.avisosform.value)
    this.aviso = await this.AvisosService.createaviso(this.avisosform.value);
    await this.getavisos().then();
  }
  async getavisos():Promise<void>{
    this.avisos = await this.AvisosService.getaviso(this.id);
  }
  async getcomment() {

    this.comments = await this.taskService.getcommentuser(this.id);
    // console.log(this.comments);
  }
  async getcusertasks():Promise<void> {
    this.asigned = await this.taskService.getusertasks(this.id);
    console.log(this.asigned);
  }
  async idasign2(id: number): Promise<void> {
    try {
      console.log(id);
      this.deleted = await this.taskService.delassigned(id);
      await this.getcusertasks();
    } catch (error) {
      console.error('Error al eliminar asignación o cargar tareas:', error);
    }
  }
  deltok():void{
    this.logoutService.delAuthToken();
  }
  async idasign3(id: number): Promise<void> {
    try {
      console.log(id);
      this.deleted = await this.taskService.delcomment(id);
      await this.getcomment();
    } catch (error) {
      console.error('Error al eliminar asignación o cargar tareas:', error);
    }
  }
  async getloged(): Promise<void> {
    try {
      this.loged = await this.authService.getinfo(); // sin tocar la respuesta
      console.log('Usuario logeado:', this.loged);
    } catch (error) {
      console.error('Error al obtener el usuario logeado:', error);
    }
  }
  admin():void{
    this.router.navigate(['admin-panel']);
  }
  async delaviso(id:number): Promise<void> {
    try {
      await this.AvisosService.delete(id);
      console.log(`Aviso con ID ${id} eliminado correctamente.`);
      await this.getavisos().then();
    } catch (error) {
      console.error('Error al eliminar el aviso:', error);
    }
  }
}

