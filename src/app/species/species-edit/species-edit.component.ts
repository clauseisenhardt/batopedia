import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Species } from '../species.model';
import * as SpeciesActions from '../store/species.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-species-edit',
  templateUrl: './species-edit.component.html',
  styleUrls: ['./species-edit.component.css']
})
export class SpeciesEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Species;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('species')
      .subscribe(stateData => {
        if (stateData.editedSpeciesIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedSpecies;
          this.slForm.setValue({
            name: this.editedItem.name,
            description: this.editedItem.description,
            imagePath: this.editedItem.imagePath
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newSpecies = new Species(value.name, value.description, value.imagePath);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        new SpeciesActions.UpdateSpecies(newSpecies)
      );
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new SpeciesActions.AddSpecies(newSpecies));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new SpeciesActions.StopEdit());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new SpeciesActions.DeleteSpecies());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new SpeciesActions.StopEdit());
  }
}
