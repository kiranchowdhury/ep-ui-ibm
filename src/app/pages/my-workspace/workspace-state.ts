import { WorkspaceHeaderState } from './workspace-header/workspace-header-state';
import { WorkspaceBodyState } from './workspace-body/workspace-body-state';
import { SearchCriteriaSate } from './saved-criteria/search-criteria.state';

export interface WorkspaceState {
    // wsHeaderState: WorkspaceHeaderState;
    // wsBodyState: WorkspaceBodyState;
    savedCriteriaState: SearchCriteriaSate;
}

