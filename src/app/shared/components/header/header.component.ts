import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'cons-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  pageTitle$: Observable<string>;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  
  ngOnInit(): void {
    this.pageTitle$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;

        while (child?.firstChild) {
          child = child.firstChild;
        }
        
        return child?.snapshot.data['title'];
      })
    )
  }
}
