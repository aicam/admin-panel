import {Component, OnInit} from '@angular/core';
import io from 'socket.io-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NbGlobalPhysicalPosition, NbGlobalPosition, NbThemeService, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {AuthService} from '../../auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-bootstrap',
  templateUrl: './index/configuration.component.html',
})
export class ConfigurationComponent implements OnInit {
  http: any;
  token: string;
  httpHeader: any;
  is_selected: boolean = false;
  is_loaded: boolean = false;
  radiobox_array: any [] = [];
  groups: string[] = [];
  clicked: boolean = false;
  loaded_gp: boolean = false;
  ab: boolean = false;
  set_ab(event) {
    event.target.class = 'btn-warning';
    this.ab = true;
  }
  scheduleStart() {
    this.showToast(NbToastStatus.SUCCESS, 'وضعیت', 'تنظیمات جدید با موفقیت ثبت شد');
  }
  getUsername() {
    return localStorage['username'];
  }
  async ngOnInit() {
    await this.getSensorsNames();
    this.http.get('http://192.168.1.13:3000/get_groups/' + this.getUsername(),
      {headers: this.httpHeader}).subscribe(response => {
      const jsonstring = JSON.stringify(response);
      const jsonArray = JSON.parse(jsonstring);
      jsonArray.map(item => { this.groups.push(item); });
    });
  }
  clicked_sensor() {
    this.loaded_gp = true;
  }
  constructor(private _http: HttpClient, private theme: NbThemeService, private toastrService: NbToastrService,
              private authService: AuthService,
              private router: Router) {
    this.http = _http;
    this.token = this.authService.getToken();
    if ( this.token === '' )
      this.router.navigateByUrl('/auth/login');
    this.httpHeader = {'Authorization': 'Bearer ' + this.token};
  }
  async getSensorsNames() {
    this.http.get('http://192.168.1.13:3000/sensors/' + this.getUsername(),
      {headers: this.httpHeader} )
      .subscribe((response, err) => {
        const names_json = JSON.stringify(response);
        const names_array = JSON.parse(names_json);
        names_array.map((item) => {this.radiobox_array.push(item);
          this.is_loaded = true;
        });
        this.showToast(NbToastStatus.SUCCESS, 'وضعیت', 'گروه سنسور ها با موفقیت دریافت شد');
        return 'done';
      });
    return 'problem occured';
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
