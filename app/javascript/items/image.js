// Crop image to square, resize to 600 and rotate appropiately before upload.
import EXIF from 'exif-js' // TODO file.exifdata ?

document.addEventListener('turbolinks:load', (e) => {
  const canvas_size = 600;
  var hidden = document.querySelector('#item_image')
  if (!hidden) {
    return;
  }
  var label = document.querySelector('#file_label')
  document.querySelector('#item_choose_image').addEventListener('change', function(e) {
    var file = this.files[0];

    if(file.type.match(/image.*/)) {
      console.log('An image has been loaded');

      // Load the image
      var reader = new FileReader();
      reader.onload = function (readerEvent) {
        var image = new Image();
        image.onload = async function (imageEvent) {
          console.log('image event')
          // Get dimension
          // var canvas = document.querySelector('#image_canvas'),
          var canvas = document.createElement('canvas'),
              size = Math.min(image.width, image.height)
          canvas.width = canvas_size;
          canvas.height = canvas_size;
          // Get rotation
          var rotation, origin=[0,0];
          var promise = new Promise(function(resolve, reject) {
              EXIF.getData(file, function () {
                  var tag = EXIF.getTag(this, 'Orientation');
                  if (tag) {
                    console.log('in: '+tag.toString());
                    resolve(tag);
                  } else {
                    resolve(0);
                  }
              });
          });
          rotation = await promise
          switch (rotation) {
            case 1:
              break;
            case 6:
              canvas.getContext('2d').rotate(Math.PI/2);
              origin = [0,-1]
              break;
            case 3:
              canvas.getContext('2d').rotate(Math.PI);
              origin = [-1,-1]
              break;
            case 8:
              canvas.getContext('2d').rotate(-Math.PI/2);
              origin = [-1,0]
              break;
            default:
              console.log('Rotation is -' + rotation + '-')
          }
          // Draw image
          var ctx = canvas.getContext('2d')
          ctx.drawImage(image, 0, 0, size, size, //crop
            origin[0]*canvas_size, origin[1]*canvas_size, canvas_size, canvas_size); //resize

          // console.log(canvas.toDataURL(file.type))
          hidden.value = canvas.toDataURL(file.type);
          e.target.value = '';
          label.textContent = file.name
        }
        image.src = this.result;
      }
      reader.readAsDataURL(file);
    }
  });
});
