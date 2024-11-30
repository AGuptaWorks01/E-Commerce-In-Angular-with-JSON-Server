import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (
          typeof localStorage !== 'undefined' &&
          localStorage.getItem('seller') &&
          val.url.includes('seller')
        ) {
          this.menuType = 'seller';
        } else {
          console.log('outside');
          this.menuType = 'default';
        }
      }
    });
  }
}
