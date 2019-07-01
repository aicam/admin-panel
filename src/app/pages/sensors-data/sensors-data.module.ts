import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { SensorsDataComponent} from './sensors-data.component';
import { EchartsMultipleXaxisComponent } from './echarts/echarts-multiple-xaxis.component';
import { EchartsLineComponent } from './echarts/echarts-line.component';
import { ThemeModule } from '../../@theme/theme.module';
import { EchartsBarComponent} from './echarts/echarts-bar.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../../auth-interceptor';


const components = [
  EchartsMultipleXaxisComponent,
  EchartsLineComponent,
  SensorsDataComponent,
  EchartsBarComponent,
];

@NgModule({
  imports: [ThemeModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...components],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
})
export class SensorsDataModule {}
