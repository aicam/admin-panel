import {AfterViewInit, Component, Injectable, OnInit} from '@angular/core';
import io from 'socket.io-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NbGlobalPhysicalPosition, NbGlobalPosition, NbThemeService, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {AuthService} from '../../auth-service';
import {Router} from '@angular/router';
import {EchartsMultipleXaxisComponent} from './charts/echarts-multiple-xaxis.component';

@Component({
  selector: 'ngx-bootstrap',
  templateUrl: './charts/forecast.component.html',
})
export class ForecastComponent implements OnInit {
  options: any;
  radiobox_array: any [] = [];
  sensor_name: string = '';
  is_loaded: boolean = false;
  dataParsed: any[] = [];
  token: string = '';
  httpHeader: any;
  test: string = '';
  authService: any;
  routers: Router;
  http: any;
  is_selected: boolean = false;
  async ngOnInit() {
    if ( this.token === '' )
      this.routers.navigateByUrl('/auth/login');
    this.httpHeader = {'Authorization': 'Bearer ' + this.token};
    await this.getSensorsNames();
  }
  getUsername() {
    return localStorage['username'];
  }
  constructor(_http: HttpClient, private theme: NbThemeService,
              private toastrService: NbToastrService, authService: AuthService,
              private router: Router,
              private ecmx: EchartsMultipleXaxisComponent,
  ) {
    this.authService = authService;
    this.token = this.authService.getToken();
    this.routers = router;
    this.http = _http;
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

  data_labeled_multi: string[] = [];
  data_labeled_line: string[] = [];
  data_multi: number[] = [];
  data_line: number[] = [];
  selected(event) {
    this.data_labeled_line = [];
    this.data_line = [];
    this.data_multi = [];
    this.data_labeled_multi = [];
    this.is_selected = false;
    this.sensor_name = event.target.value;
    const id = event.target.id;
    this.http.get('http://192.168.1.13:3000/sensorLocation/' + this.radiobox_array[id]['id'],
      {headers: this.httpHeader}).subscribe((response) => {
      const stringified = JSON.stringify(response);
      this.dataParsed = JSON.parse(stringified);
      const long = this.dataParsed['long'];
      const lat = this.dataParsed['lat'];
    });
    this.is_selected = true;
    this.refresh_view();
  }
  // Toast
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
  // refresh view
  options_line: any = {};
  themeSubscription: any;
  refresh_view () {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.success, colors.info],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['minimum temperature ', 'maximum temperature'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.info,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
            ],
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.success,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
            ],
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
            name: 'min',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: [3.9, 5.9, 11.1, 18.7, 22, 32, 12, 46.6, 55.4, 18.4, 10.3, 0.7],
          },
          {
            name: 'max',
            type: 'line',
            smooth: true,
            data: [3.9, 5.9, 14, 19, 48.3, 69.2, 23.6, 50.6, 57.4, 20.4, 12.3, 6],
          },
        ],
      };
    });
  }
}
