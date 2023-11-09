import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutpagedataService {
  constructor() {}

  planname: string = '';
  planamount: number = 0;
}
