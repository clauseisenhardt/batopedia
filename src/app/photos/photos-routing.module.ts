import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosComponent } from './photos.component';
import { AuthGuard } from '../auth/auth.guard';
import { PhotoStartComponent } from './photo-start/photo-start.component';
import { PhotoEditComponent } from './photo-edit/photo-edit.component';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { PhotosResolverService } from './photos-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PhotosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PhotoStartComponent },
      { path: 'new', component: PhotoEditComponent },
      {
        path: ':id',
        component: PhotoDetailComponent,
        resolve: [PhotosResolverService]
      },
      {
        path: ':id/edit',
        component: PhotoEditComponent,
        resolve: [PhotosResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule {}
