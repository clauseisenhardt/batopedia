import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SpeciesComponent } from './species.component';
import { SpeciesEditComponent } from './species-edit/species-edit.component';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [SpeciesComponent, SpeciesEditComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', component: SpeciesComponent }]),
    SharedModule
  ],
  // providers: [LoggingService]
})
export class SpeciesModule {}
