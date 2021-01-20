// Globals
var image;
function upload() {
  var fileIn = document.getElementById("F1");

  var c1 = document.getElementById("can1");
  image = new SimpleImage(fileIn);

  image.drawTo(c1);
}



function doRainbow(imageData) {
  console.log("Rainbow: begin");
  image = new SimpleImage(imageData);
  console.log("Rainbow: image");
  newImage = new SimpleImage(image.getWidth(), image.getHeight());
  console.log("Rainbow: newImage");
  var cnt = 0;
  for (var pix of image.values()){
    var avg = (pix.getRed() + pix.getGreen() + pix.getBlue())/3;
    var newPix = newImage.getPixel(pix.getX(),pix.getY());
    // Red
    if (pix.getY() < (image.getHeight()/7 ) ){
      if (avg < 128){
        newPix.setRed(avg*2);
        newPix.setGreen(0);
        newPix.setBlue(0);
      }
      else{
        newPix.setRed(255);
        newPix.setGreen(avg*2-255);
        newPix.setBlue(avg*2-255);
      }
    }
    // Orange
    else if (pix.getY() < (2*image.getHeight()/7 ) ){
      if (avg < 128){
        newPix.setRed(avg*2);
        newPix.setGreen(avg*0.8);
        newPix.setBlue(0);
      }
      else{
        newPix.setRed(255);
        newPix.setGreen(avg*1.2-51);
        newPix.setBlue(avg*2-255);
      }
    }
    // Yellow
    else if (pix.getY() < (3*image.getHeight()/7 ) ){
      if (avg < 128){
        newPix.setRed(avg*2);
        newPix.setGreen(avg*2);
        newPix.setBlue(0);
      }
      else{
        newPix.setRed(255);
        newPix.setGreen(255);
        newPix.setBlue(avg*2-255);
      }
    }
    // Green
    else if (pix.getY() < (4*image.getHeight()/7 ) ){
      if (avg < 128){
        newPix.setRed(0);
        newPix.setGreen(avg*2);
        newPix.setBlue(0);
      }
      else{
        newPix.setRed(avg*2-255);
        newPix.setGreen(255);
        newPix.setBlue(avg*2-255);
      }
    }
    // Blue
    else if (pix.getY() < (5*image.getHeight()/7 ) ){
      if (avg < 128){
        newPix.setRed(0);
        newPix.setGreen(0);
        newPix.setBlue(avg*2);
      }
      else{
        newPix.setRed(avg*2-255);
        newPix.setGreen(avg*2-255);
        newPix.setBlue(255);
      }
    }
    // Indigo
    else if (pix.getY() < (6*image.getHeight()/7 ) ){
      if (avg < 128){
        newPix.setRed(avg*0.8);
        newPix.setGreen(0);
        newPix.setBlue(avg*2);
      }
      else{
        newPix.setRed(avg*1.2-51);
        newPix.setGreen(avg*2-255);
        newPix.setBlue(255);
      }
    }
    // Violet
    else {
      if (avg < 128){
        newPix.setRed(avg*1.6);
        newPix.setGreen(0);
        newPix.setBlue(avg*1.6);
      }
      else{
        newPix.setRed(avg*0.4+153);
        newPix.setGreen(avg*2-255);
        newPix.setBlue(avg*0.4+153);
      }
    }

    cnt = cnt + 1;
    newImage.setPixel(pix.getX(),pix.getY(),newPix);
  }
  console.log("Rainbow: Loop End: " + cnt.toString());
  //var convImage = document.getElementById("ConvImageCanv");
  var convImage = document.createElement("canvas");
  newImage.drawTo(convImage);
  var dataURL = convImage.toDataURL("image/png");
  console.log("Rainbow:End");
  return dataURL;
}

