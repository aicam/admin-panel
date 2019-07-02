import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AddGroupComponent} from './add-group.component';
const components = [
  AddGroupComponent,
];

@NgModule({
  imports: [ThemeModule],
  declarations: [...components],
})
export class AddGroupModule {}
