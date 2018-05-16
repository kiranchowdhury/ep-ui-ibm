import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SearchCriteria } from './search-criteria.state';

@Component({
  selector: 'ep-saved-criteria',
  templateUrl: './saved-criteria.component.html',
  styleUrls: ['./saved-criteria.component.scss']
})
export class SavedCriteriaComponent implements OnInit {
  @Input() savedCriterias: SearchCriteria[] = [];
  @Input() selectedCriteria: SearchCriteria;
  @Output() criteriaSelectEvent: EventEmitter<SearchCriteria> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onCriteriaSelect(selectedOption: any) {
    console.log('Option Selected####', selectedOption);
    const criteria  = this.getNewSelectedCriteria(selectedOption.value);

    this.criteriaSelectEvent.emit(criteria);
  }

  private getNewSelectedCriteria(code): SearchCriteria {
    let newCriteria = null;
    this.savedCriterias.forEach(criteria => {
      if (criteria.code === code) {
        newCriteria = criteria;
        this.selectedCriteria = criteria;
        newCriteria.lastSelected = true;
       // return criteria;
      }
    })
    return newCriteria;
  }

}
