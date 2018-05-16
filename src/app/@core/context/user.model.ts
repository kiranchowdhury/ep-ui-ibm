import { Group } from '../auth/auth.state';
import { AuthFunction } from '../auth/auth.contract';

export class User {
    email: string;
    currentGroup: Group;
}

export class UserAuth {
    authFunctions: AuthFunction[];
    authCtrys: {code: string, name: string}[];
}

