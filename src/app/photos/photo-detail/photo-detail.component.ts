import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Photo } from '../photo.model';
import * as fromApp from '../../store/app.reducer';
import * as PhotosActions from '../store/photo.actions';
import * as SpeciesActions from '../../species/store/species.actions';
import { Species } from 'src/app/species/species.model';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Using javascript import from src/asset/js/rainbow.js
declare function doRainbow(image): any;


@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  photo: Photo;
  id: number;
  photoConverterActive = false;
  localImage: any;
  convertedImage: string;
  isImageLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private httpClient: HttpClient
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
      this.photoConverterActive = false;
  }

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

  onLoadPhoto() {
    this.photoConverterActive = true;
    let imageUrl = this.photo.imagePath;
    this.isImageLoading = true;

    console.log("onLoadPhoto: start");
    this.getImageFromService(imageUrl);
    // this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
    //   // console.log(base64data);
    //   // this is the image as dataUrl
    //   this.localImage = 'data:image/jpg;base64,' + base64data;
    //   this.isImageLoading = false;
    // });

    //this.onConvertePhoto();

    console.log("onLoadPhoto: end");
  }

  onConvertePhoto() {
    console.log("onConvertePhoto: doRainbow start");
    //console.log(this.localImage);
    this.convertedImage = doRainbow(this.localImage);
    //console.log(this.convertedImage);
    console.log("onConvertePhoto: doRainbow end");
  }

  getImageService(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, { responseType: 'blob' });
  }

  createImageFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.localImage = reader.result;
     }, false);

     if (image) {
        reader.readAsDataURL(image);
     }
  }

  getImageFromService(imageUrl: string) {
    this.isImageLoading = true;
    this.getImageService(imageUrl).subscribe(data => {
      this.createImageFromBlob(data);

      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  // getBase64Image(img: HTMLImageElement) {
  //   // We create a HTML canvas object that will create a 2d image
  //   var canvas = document.createElement("canvas");
  //   canvas.width = img.width;
  //   canvas.height = img.height;
  //   var ctx = canvas.getContext("2d");
  //   // This will draw image
  //   ctx.drawImage(img, 0, 0);
  //   // Convert the drawn image to Data URL
  //   var dataURL = canvas.toDataURL("image/png");
  //   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  // }

  // getBase64ImageFromURL(url: string) {
  //   return Observable.create((observer: Observer<string>) => {
  //     // create an image object
  //     let img = new Image();
  //     // console.log("Empty image created!")
  //     img.crossOrigin = 'Anonymous';
  //     img.src = url;
  //     if (!img.complete) {
  //       // This will call another method that will create image from url
  //       img.onload = () => {
  //         observer.next(this.getBase64Image(img));
  //         observer.complete();
  //       };
  //       img.onerror = (err) => {
  //         observer.error(err);
  //       };
  //     } else {
  //       observer.next(this.getBase64Image(img));
  //       observer.complete();
  //     }
  //   });
  // }

  // onAddToShoppingList() {
  //   // this.photoService.addIngredientsToShoppingList(this.photo.ingredients);
  //   this.store.dispatch(
  //     new ShoppingListActions.AddIngredients(this.photo.ingredients)
  //   );
  // }
}
