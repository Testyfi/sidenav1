import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() collapsed=false;
  @Input() screenWidth=0;
  @Input() sidehead=false;
  
  
getBodyClass():string{
  if(this.sidehead){
    
    //console.log("works");
    return "bodywithoutsidebar";}
 // console.log(this.screenWidth);
  let styleClass='';
  if(this.collapsed && this.screenWidth>768)
  {

    styleClass='body-trimmed';
  }
  else if(this.collapsed && this.screenWidth<=768 && this.screenWidth > 0){
     styleClass='body-md-screen';

  }
  //return "bodywithoutsidebar";
return styleClass;

}
}
