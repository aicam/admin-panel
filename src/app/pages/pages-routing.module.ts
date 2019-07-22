import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {SensorsDataComponent} from './sensors-data/sensors-data.component';
import {AddRelayComponent} from './add-relay/add-relay.component';
import {AddSensorComponent} from './add-sensor/add-sensor.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ForecastComponent} from './forecast/forecast.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {AddGroupComponent} from './add-group/add-group.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'config',
      component: ConfigurationComponent,
    }, {
      path: 'forecast',
      component: ForecastComponent,
    }, {
      path: 'addRelay',
      component: AddRelayComponent,
    }
    // }, {
    //   path: 'dashboard',
    //   component: ECommerceComponent,
    // }
    , {
      path: 'schedule',
      component: ScheduleComponent,
    }, {
      path: 'addSensor',
      component: AddSensorComponent,
    }, {
      path: 'iot-dashboard',
      component: DashboardComponent,
    }, {
      path: 'sensorsData',
      component: SensorsDataComponent,
    }, {
      path: 'add-group',
      component: AddGroupComponent,
    }, {
      path: 'ui-features',
      loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
    }, {
      path: 'modal-overlays',
      loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
    }, {
      path: 'extra-components',
      loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
    }, {
      path: 'bootstrap',
      loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
    }, {
      path: 'maps',
      loadChildren: './maps/maps.module#MapsModule',
    }, {
      path: 'charts',
      loadChildren: './charts/charts.module#ChartsModule',
    }, {
      path: 'editors',
      loadChildren: './editors/editors.module#EditorsModule',
    }, {
      path: 'forms',
      loadChildren: './forms/forms.module#FormsModule',
    }, {
      path: 'tables',
      loadChildren: './tables/tables.module#TablesModule',
    }, {
      path: 'miscellaneous',
      loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
    }, {
      path: '',
      redirectTo: 'sensorsData',
      pathMatch: 'full',
    }, {
      path: '**',
      component: NotFoundComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
