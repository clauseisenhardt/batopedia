import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as PhotoActions from '../photos/store/photo.actions';
import * as SpeciesActions from '../species/store/species.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) {
    console.log('HeaderComponent: constructor');
    console.log('HeaderComponent: isAuthenticated: ' + this.isAuthenticated);
  }

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  onSaveData() {
    // this.dataStorageService.storeRhotos();
    this.store.dispatch(new PhotoActions.StorePhotos());
    this.store.dispatch(new SpeciesActions.StoreSpecies());
  }

  onFetchData() {
    // this.dataStorageService.fetchRhotos().subscribe();
    this.store.dispatch(new PhotoActions.FetchPhotos());
    this.store.dispatch(new SpeciesActions.FetchSpecies());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
