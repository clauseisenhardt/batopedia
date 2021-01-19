import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as PhotosActions from '../store/photo.actions';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  photoForm: FormGroup;

  private storeSub: Subscription;

  // get ingredientsControls() {
  //   return (this.photoForm.get('ingredients') as FormArray).controls;
  // }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newPhoto = new Photo(
    //   this.photoForm.value['name'],
    //   this.photoForm.value['description'],
    //   this.photoForm.value['imagePath'],
    //   this.photoForm.value['ingredients']);
    if (this.editMode) {
      // this.photoService.updatePhoto(this.id, this.photoForm.value);
      this.store.dispatch(
        new PhotosActions.UpdatePhoto({
          index: this.id,
          newPhoto: this.photoForm.value
        })
      );
    } else {
      // this.photoService.addPhoto(this.photoForm.value);
      this.store.dispatch(new PhotosActions.AddPhoto(this.photoForm.value));
    }
    this.onCancel();
  }

  // onAddIngredient() {
  //   (<FormArray>this.photoForm.get('ingredients')).push(
  //     new FormGroup({
  //       name: new FormControl(null, Validators.required),
  //       amount: new FormControl(null, [
  //         Validators.required,
  //         Validators.pattern(/^[1-9]+[0-9]*$/)
  //       ])
  //     })
  //   );
  // }

  // onDeleteIngredient(index: number) {
  //   (<FormArray>this.photoForm.get('ingredients')).removeAt(index);
  // }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let photoSpecies = '';
    let photoImagePath = '';
    let photoLocation = '';
//    let photoIngredients = new FormArray([]);

    if (this.editMode) {
      // const photo = this.photoService.getPhoto(this.id);
      this.storeSub = this.store
        .select('photos')
        .pipe(
          map(photoState => {
            return photoState.photos.find((photo, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe(photo => {
          photoSpecies = photo.species;
          photoImagePath = photo.imagePath;
          photoLocation = photo.location;
          // if (photo['ingredients']) {
          //   for (let ingredient of photo.ingredients) {
          //     photoIngredients.push(
          //       new FormGroup({
          //         name: new FormControl(ingredient.name, Validators.required),
          //         amount: new FormControl(ingredient.amount, [
          //           Validators.required,
          //           Validators.pattern(/^[1-9]+[0-9]*$/)
          //         ])
          //       })
          //     );
          //   }
          // }
        });
    }

    this.photoForm = new FormGroup({
      species: new FormControl(photoSpecies, Validators.required),
      imagePath: new FormControl(photoImagePath, Validators.required),
      location: new FormControl(photoLocation, Validators.required)
      // ingredients: photoIngredients
    });
  }
}
