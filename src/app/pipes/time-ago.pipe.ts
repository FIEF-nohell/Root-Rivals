import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) { 
      var temp = new Date(value)
      var date = temp.setHours(temp.getHours() - 1) 
      
        const seconds = Math.floor((+new Date() - +date) / 1000);
        if (seconds < 86400){
          if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
              return 'Now.';
          const intervals: any = {
              'year': 31536000,
              'month': 2592000,
              'week': 604800,
              'day': 86400,
              'hour': 3600,
              'min': 60,
              'sec': 1
          };
          let counter;
          for (const i in intervals) {
              counter = Math.floor(seconds / intervals[i]);
              if (counter > 0)
                  if (counter === 1) {
                      return counter + ' ' + i + ''; // singular (1 day ago)
                  } else {
                      return counter + ' ' + i + 's'; // plural (2 days ago)
                  }
          }
        }else { // if it's more than 1 day ago
          const options: any = { year: '2-digit', month: '2-digit', day: '2-digit' };
          return new Date(value).toLocaleDateString(undefined, options);
      }
    }
    return value;
}

}