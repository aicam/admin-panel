import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {NbThemeService} from '@nebular/theme';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import {AuthService} from '../../auth-service';
@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./echarts/echarts.component.scss'],
  templateUrl: './echarts/echarts.component.html',
})
export class SensorsDataComponent implements OnInit, AfterViewInit, OnDestroy {
  radiobox_array: any [] = [];
  sensor_name: string = '';
  is_loaded: boolean = false;
  dataParsed: any[] = [];
  test: string = '';
  getUsername() {
    return 'aicam';
  }
  form: FormGroup;
  is_selected: boolean = false;
  http: any;
  toFormGroup(sensors_names: string[] ) {
    const group: any = {};

    sensors_names.forEach((question, index) => {
      group[question] = new FormControl(question);
    });
    return new FormGroup(group);
  }
  d: string = 'started';
  async getSensorsNames() {
    this.http.get('http://localhost:3000/sensors/' + this.getUsername()).subscribe((response, err) => {
      const names_json = JSON.stringify(response);
      const names_array = JSON.parse(names_json);
      this.form = this.toFormGroup(names_array);
      names_array.map((item) => {this.radiobox_array.push(item);
      this.is_loaded = true;
      });
      this.showToast(NbToastStatus.SUCCESS, 'وضعیت', 'گروه سنسور ها با موفقیت دریافت شد');
      return 'done';
    });
    return 'problem occured';
  }
  async ngOnInit() {
    this.test = this.authService.getToken();
    this.d = await this.getSensorsNames();
  }
  authService: any;
  constructor(_http: HttpClient, private theme: NbThemeService,
              private toastrService: NbToastrService, authService: AuthService) {
    this.authService = authService;
    this.http = _http;
  }

  data_labeled_multi: string[] = [];
  data_labeled_line: string[] = [];
  data_multi: number[] = [];
  data_line: number[] = [];
  selected(event) {
    this.sensor_name = event.target.value;
    const id = event.target.id;
    this.http.get('http://localhost:3000/sensor_data/' + this.radiobox_array[id]['id']).subscribe((response) => {
      const stringified = JSON.stringify(response);
      this.dataParsed = JSON.parse(stringified);
      this.dataParsed.map((item, index) => {
        if (index <= 6) {
          this.data_labeled_multi.push(item.time);
          this.data_multi.push(item.data);
        }
        if (index <= 8) {
          this.data_labeled_line.push(item.time);
          this.data_line.push(item.data);
        }
        this.is_selected = true;
      });
    });
  }

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
      `Toast ${this.index}${titleContent}`,
      config);
  }
  // chart
  options: any = {};
  options_line: any = {};
  themeSubscription: any;
  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.data_labeled_multi,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Score',
            type: 'bar',
            barWidth: '60%',
            data: this.data_multi,
          },
        ],
      };

      this.options_line = {
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.success, colors.danger],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
          data: ['Line 1', 'Line 2', 'Line 3'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'log',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series: [
          {
            name: 'maximum',
            type: 'line',
            data: [10, 10, 10, 10, 10, 10, 10, 10, 10],
          },
          {
            name: 'data',
            type: 'line',
            data: this.data_line,
          },
          {
            name: 'minimum',
            type: 'line',
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
