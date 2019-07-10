import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import {ForecastComponent} from './forecast.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import {EchartsMultipleXaxisComponent} from './charts/echarts-multiple-xaxis.component';
const components = [
  ForecastComponent,
  EchartsMultipleXaxisComponent,
];

@NgModule({
  imports: [ThemeModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...components],
})
export class ForecastModule {}
