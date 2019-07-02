import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-bootstrap',
  styleUrls: ['./form-inputs/form-inputs.component.scss'],
  templateUrl: './form-inputs/form-inputs.component.html',
})
export class ScheduleComponent implements OnInit {
  date = new Date();
  test: string = 'dadas';
  schedule_days: any[] = [];
  plans: string[] = [];
  groups: string[] = [];
  constructor(private http: HttpClient, private toastrService: NbToastrService) {}
  ngOnInit(): void {
    this.http.get('http://localhost:300/get_groups/' + this.getUsername()).subscribe(response => {
      const jsonstring = JSON.stringify(response);
      const jsonArray = JSON.parse(jsonstring);
      jsonArray.map(item => { this.groups.push(item); });
    });
  }
  changed_date ($event) {
    this.schedule_days.map(item => {
      this.plans.push('sad');
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
  getUsername () {
    return 'aicam';
  }
  scheduleStart () {
    let plan = '';
    this.schedule_days.map((item, i) => {
      plan = plan.concat(`"${item.day}":"${this.plans[i]}",`);
    });
    const data = {username: this.getUsername(), gpname: 'gp1', plan: plan};
    this.http.post<{status: string}>('http://localhost:3000/schedule', data).subscribe((response) => {
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
