import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinfoto'
})
export class SinfotoPipe implements PipeTransform {

  transform(images: any[]): string {
    const noimage = 'assets/img/noimage.png';
    if (!images) {
      return noimage;
    }

    return ( images.length > 0 ) ? images[0].url : noimage;
  }

}
