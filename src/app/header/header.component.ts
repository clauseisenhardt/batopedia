import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as PhotoActions from '../photos/store/photo.actions';
import * as SpeciesActions from '../species/store/species.actions';

declare function jsHello(parm1): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userEmail = '';
  private userSub: Subscription;
  headerBarUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Gro%C3%9Fes_Mausohr.jpg';
  //headerBarUrl = 'https://upload.wikimedia.org/wikipedia/commons/3/33/Microchiroptera.JPG';

  constructor(
    private store: Store<fromApp.AppState>
  ) {
    console.log('HeaderComponent: constructor');
    console.log('HeaderComponent: isAuthenticated: ' + this.isAuthenticated);
  }

  ngOnInit() {
    jsHello("noble one");
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        console.log(!!user);
        this.isAuthenticated = !!user;
        if (this.isAuthenticated) {
          this.userEmail = user.email;
          console.log(user.email);
        }
    });
    console.log('HeaderComponent:ngOnInit isAuthenticated: ' + this.isAuthenticated);
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
    this.userEmail = '';
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
