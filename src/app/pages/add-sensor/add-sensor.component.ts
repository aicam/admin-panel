import {Component} from '@angular/core';
import {NbGlobalPhysicalPosition, NbGlobalPosition, NbThemeService, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth-service';
import {Router} from '@angular/router';


@Component({
  selector: 'ngx-bootstrap',
  styleUrls: ['./form/form-inputs.component.scss'],
  templateUrl: './form/add-sensor.component.html',
})
export class AddSensorComponent {
  name: string = '';
  sensorID: string = '';
  period: number = 0;
  long: number;
  lat: number;
  test: string = '';
  http: any;
  token: string = '';
  httpHeader: any;
  getUsername() {
    return localStorage['username'];
  }

  clicked() {
    this.http.get('http://192.168.1.13:3000/add_sensor/' + this.sensorID + '/' +
      this.name + '/' + this.period + '/' + this.long + '/' + this.lat + '/' +
      this.getUsername(), {headers: this.httpHeader}).subscribe((response) => {
        const resJson = JSON.stringify(response);
        const resArr = JSON.parse(resJson);
        if (resArr.status)
          this.showToast(NbToastStatus.SUCCESS, 'وضعیت', 'سنسور جدید با موفقیت ثبت شد');
    });
  }

  constructor(_http: HttpClient, private theme: NbThemeService, private toastrService: NbToastrService,
              private authService: AuthService,
              private router: Router) {
    this.http = _http;
    this.token = this.authService.getToken();
    if ( this.token === '' )
      this.router.navigateByUrl('/auth/login');
    this.httpHeader = {'Authorization': 'Bearer ' + this.token};
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
