import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AddRelayComponent} from './add-relay.component';
import { ButtonsModule } from './buttons/buttons.module';
const components = [
  AddRelayComponent,
];

@NgModule({
  imports: [ThemeModule, ButtonsModule],
  declarations: [...components],
})
export class AddRelayModule {}
