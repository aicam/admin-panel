import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SensorsDataModule} from './sensors-data/sensors-data.module';
import { AddSensorModule } from './add-sensor/add-sensor.module';
import { ScheduleModule} from './schedule/schedule.module';
import { AddRelayModule } from './add-relay/add-relay.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../auth-interceptor';
import {AddGroupModule} from './add-group/add-group.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    AddGroupModule,
    PagesRoutingModule,
    ScheduleModule,
    AddSensorModule,
    AddRelayModule,
    ThemeModule,
    SensorsDataModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
})
export class PagesModule {
}
