import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Photo } from '../photo.model';
import * as fromApp from '../../store/app.reducer';
import * as PhotosActions from '../store/photo.actions';
import * as SpeciesActions from '../../species/store/species.actions';
import { Species } from 'src/app/species/species.model';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  photo: Photo;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('photos');
        }),
        map(photosState => {
          return photosState.photos.find((photo, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(photo => {
        this.photo = photo;
      });
  }

  // onAddToShoppingList() {
  //   // this.photoService.addIngredientsToShoppingList(this.photo.ingredients);
  //   this.store.dispatch(
  //     new ShoppingListActions.AddIngredients(this.photo.ingredients)
  //   );
  // }

  onAddToSpecies() {
    let species = new Species(this.photo.species, 'Missing description', this.photo.imagePath)
    this.store.dispatch(
      new SpeciesActions.AddSpecies(species)
    );
  }
  onEditPhoto() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeletePhoto() {
    // this.photoService.deletePhoto(this.id);
    this.store.dispatch(new PhotosActions.DeletePhoto(this.id));
    this.router.navigate(['/photos']);
  }
}
