import { Component } from '@angular/core';
import { Coach } from '../../../../shared/models/model/coach.model';
import { CoachesService } from '../../../../shared/services/coaches/coaches.service';

@Component({
  selector: 'cons-coaches-list',
  standalone: false,
  templateUrl: './coaches-list.component.html',
  styleUrl: './coaches-list.component.scss'
})

export class CoachesListComponent {
  coaches: Coach[];
  isExpandedView: boolean = true;
  filters = {
    languages: [],
    technologies: [],
    position: '',
    search: '',
    companyName: ''
  }

  constructor(private coachesService: CoachesService) {}

  ngOnInit(): void {
    //this.initList();

  }

  toggleView() {
    this.isExpandedView = !this.isExpandedView;
  }

  resetFilters() {
    this.filters = {
      languages: [],
      technologies: [],
      position: '',
      search: '',
      companyName: ''
    };
  }

  get expandedViewList(): boolean {
    return this.isExpandedView;
  }

  private initList() {
    this.coachesService.getCoaches().subscribe(
      (data) => {
        this.coaches = data;
      }
    )
  }
}
