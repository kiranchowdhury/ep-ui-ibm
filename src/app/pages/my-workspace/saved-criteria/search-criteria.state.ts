import { ErrorResponse } from '../../../@core/error/error-response';

export interface SearchCriteriaSate {
    loading?: boolean,
    loadingMsg?: string,
    savedCriteria: SearchCriteria[],
    default: SearchCriteria,
    lastSelected: SearchCriteria,
    error?: ErrorResponse,
}

export interface SearchCriteria {
    code: string;
    name: string;
    default?: boolean;
    lastSelected?: boolean;
    criteriaMap?: CriteriaNameValueMap[]
}

export interface CriteriaNameValueMap {
    name: string;
    value: any[];
}
