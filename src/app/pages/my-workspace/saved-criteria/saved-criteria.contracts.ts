import { SearchCriteria } from './search-criteria.state';

export interface LoadCriteriaRequest {
    email: string;
    group: string;
}
export interface LoadCriteriaResponse {
    savedCriterias: SearchCriteria[]
}
