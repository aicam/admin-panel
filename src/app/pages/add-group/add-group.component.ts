import { Component } from '@angular/core';
import io from 'socket.io-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NbGlobalPhysicalPosition, NbGlobalPosition, NbThemeService, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-bootstrap',
  styleUrls: ['./form-inputs/form-inputs.component.scss'],
  templateUrl: './form-inputs/form-inputs.component.html',
})

export class AddGroupComponent {
  constructor(private http: HttpClient) {}
}
