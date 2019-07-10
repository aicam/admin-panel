import { Component } from '@angular/core';
import io from 'socket.io-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NbGlobalPhysicalPosition, NbGlobalPosition, NbThemeService, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {AuthService} from '../../auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-bootstrap',
  styleUrls: ['./form-inputs/form-inputs.component.scss'],
  templateUrl: './form-inputs/form-inputs.component.html',
})
// https://www.techiediaries.com/angular-http-client/
export class AddRelayComponent {
  name: string;
  relayID: string;
  long: number;
  lat: number;
  http: any;
  token: string = '';
  httpHeader: any;
  getUsername() {
    return localStorage['username'];
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
  onClicked() {
    this.http.get('http://localhost:3000/add_relay/' + this.relayID + '/' + this.name +
      '/' + this.long + '/' + this.lat + '/' + this.getUsername(),
      {headers: this.httpHeader}).subscribe((response) => {
      const resJson = JSON.stringify(response);
      const resArr = JSON.parse(resJson);
      if (resArr['status']) {
        this.showToast(NbToastStatus.SUCCESS, 'وضعیت', 'کلید موردنظر با موفقیت ثبت شد');
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
