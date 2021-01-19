import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PhotosComponent } from './photos.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { PhotoItemComponent } from './photo-list/photo-item/photo-item.component';
import { PhotoStartComponent } from './photo-start/photo-start.component';
import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { PhotosRoutingModule } from './photos-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PhotosComponent,
    PhotoListComponent,
    PhotoDetailComponent,
    PhotoItemComponent,
    PhotoStartComponent,
    PhotoEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    PhotosRoutingModule,
    SharedModule
  ]
})
export class PhotosModule {}
