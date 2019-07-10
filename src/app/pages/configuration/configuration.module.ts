import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ConfigurationComponent} from './configuration.component';
const components = [
  ConfigurationComponent,
];

@NgModule({
  imports: [ThemeModule],
  declarations: [...components],
})
export class ConfigurationModule {}
