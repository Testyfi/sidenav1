import { Component } from '@angular/core';
import { delay } from 'rxjs';
interface chat {
  from: string;
  value: string;
}
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent {
  //fromuser[] = new string[];

  //fromuser: Array<string> = [];
  //fromserver: Array<string> = [];
  chats: Array<chat> = [];
  message(e: any) {
    let temp = <chat>{};
    //this.fromuser.push(e.target.value);

    temp.from = 'user';
    temp.value = e.target.value;

    this.chats.push(temp);
    temp = <chat>{};
    console.log(temp);
    temp.from = 'server';
    temp.value = this.reply();
    this.chats.push(temp);
    e.target.value = '';
    //console.log('Every thing is ok');
  }
  reply(): string {
    return 'This page allows you to generate random text strings using true randomness, which for many purposes is better than the pseudo-random number algorithms ...';
  }
}
