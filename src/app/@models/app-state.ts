import { LoginState } from '../@core/login/login.state';
import { AuthState } from '../@core/auth/auth.state';
import { WorkspaceState } from '../pages/my-workspace/workspace-state';

export interface AppState {
    login: LoginState,
    auth: AuthState;
    workspace: WorkspaceState
}
