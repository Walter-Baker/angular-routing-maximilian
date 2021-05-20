import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() homeLink: string = "/";
  @Input() routerLink1: string;
  @Input() routerLink2: string;

}
