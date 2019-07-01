import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AddSensorComponent } from './add-sensor.component';
import { ButtonsModule } from './buttons/buttons.module';
const components = [
  AddSensorComponent,
];

@NgModule({
  imports: [ThemeModule, ButtonsModule],
  declarations: [...components],
})
export class AddSensorModule {}
