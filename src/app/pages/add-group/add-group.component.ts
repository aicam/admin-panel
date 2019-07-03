import {Component, OnInit} from '@angular/core';
import io from 'socket.io-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NbGlobalPhysicalPosition, NbGlobalPosition, NbThemeService, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {AuthService} from '../../auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-bootstrap',
  templateUrl: './add-group.component.html',
})

export class AddGroupComponent implements OnInit {
  group_names: any[] = [];
  relay_selected: string[] = [];
  test: string = '';
  gpname: string = '';
  token: string = '';
  httpHeader: any;
  getUsername() {
    return localStorage['username'];
  }
  ngOnInit(): void {
    this.http.get('http://localhost:3000/get_relays/' + this.getUsername(),
      {headers: this.httpHeader}).subscribe(response => {
      const jsonstring = JSON.stringify(response);
      const jsonArray = JSON.parse(jsonstring);
      jsonArray.map(item => { this.group_names.push({id: item.id, name: item.name, cl: 'btn-warning'}); });
    });
  }

  constructor(private http: HttpClient, private toastrService: NbToastrService, private authService: AuthService,
  private router: Router) {
    this.token = this.authService.getToken();
    if ( this.token === '' )
      this.router.navigateByUrl('/auth/login');
    this.httpHeader = {'Authorization': 'Bearer ' + this.token};
  }
  onClicked (event) {
    this.group_names.map(item => {
      if (item.name === event.target.value && item.cl === 'btn-warning') {
        item.cl = 'btn-success';
        this.relay_selected.push(item.id);
      }
    });
  }
  add_gp () {
    const post_data = {gpname: this.gpname, relays: JSON.stringify(this.relay_selected)};
    this.http.post('http://localhost:3000/add_group', post_data, {headers: this.httpHeader}).subscribe(response => {
      const resJson = JSON.stringify(response);
      const resArr = JSON.parse(resJson);
      if (resArr['status']) {
        this.showToast(NbToastStatus.SUCCESS, 'وضعیت', 'گروه جدید اضافه شد');
      }
    });
  }

  // toast
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
