import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ScheduleComponent} from './schedule.component';
import { ButtonsModule } from './buttons/buttons.module';
const components = [
  ScheduleComponent,
];

@NgModule({
  imports: [ThemeModule, ButtonsModule],
  declarations: [...components],
})
export class ScheduleModule {}
