import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {AuthService} from '../../auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-bootstrap',
  styleUrls: ['./form-inputs/form-inputs.component.scss', '../../styles/styles.css'],
  templateUrl: './form-inputs/form-inputs.component.html',
})
export class ScheduleComponent implements OnInit {
  date = new Date();
  test: string = '';
  schedule_days: any[] = [];
  plans: string[] = [];
  groups: string[] = [];
  group_name: string = '';
  token: string = '';
  httpHeader: any;
  constructor(private http: HttpClient, private toastrService: NbToastrService, private authService: AuthService,
              private router: Router) {
    this.token = this.authService.getToken();
    if ( this.token === '' )
      this.router.navigateByUrl('/auth/login');
    this.httpHeader = {'Authorization': 'Bearer ' + this.token};
  }
  ngOnInit(): void {
    this.http.get('http://192.168.1.13:3000/get_groups/' + this.getUsername(),
      {headers: this.httpHeader}).subscribe(response => {
      const jsonstring = JSON.stringify(response);
      const jsonArray = JSON.parse(jsonstring);
      jsonArray.map(item => { this.groups.push(item); });
    });
  }
  select_group (event) {
    this.group_name = event.target.value;
    this.test = this.group_name;
  }
  changed_date ($event) {
    this.schedule_days.map(item => {
      this.plans.push('');
      if (item.day === $event.toString().split(' ')[2] )
        return 0;
    });
    this.schedule_days.push({'day': $event.toString().split(' ')[2]});
  }
  new_plan_added (event) {
    this.schedule_days.map(item => {
      if (item.day === event.target.id)
        this.test = event.target.value;
    });
  }
  getUsername() {
    return localStorage['username'];
  }
  scheduleStart () {
    let plan = '';
    this.schedule_days.map((item, i) => {
      plan = plan.concat(`"${item.day}":"${this.plans[i]}",`);
    });
    const data = {username: this.getUsername(), gpname: this.group_name, plan: plan};
    this.http.post<{status: string}>('http://192.168.1.13:3000/schedule', data,
      {headers: this.httpHeader}).subscribe((response) => {
      this.showToast(NbToastStatus.SUCCESS, 'وضعیت', 'برنامه جدید با موفقیت ثبت شد.');
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
