import { Group } from './auth.state';

export interface LoadGroupsRequest {
    apiid: string;
    methodname: string;
}

export interface LoadGroupsResponse {
    responsetime: string;
    message: string,
    status: string,
    items: LoadGroupsResponseItems[]
}

export interface LoadGroupsResponseItems {
    alias: string;
    selectedgroupcode: string;
    selectedgroup: string;
    groupingseparator: string;
    decimalseparator: string;
    browserlanguage: string;
    userid: string;
    email: string;
    groups: Group[];
  }

export interface SelectGroupRequest {
    apiid: string;
    methodname: string;
    selectedgroup: string;
}

export interface SelectGroupResponse {
    responsetime: string;
    message: string;
    status: string;
    items: SelectGroupResponseItem[]
  }

  export interface SelectGroupResponseItem {
    geo: string,
    selectedgroup: string,
    selectedgroupname: string,
    authtolandtopricing: string,
    bpquotevisibility: string,
    auth_functions: AuthFunction[]
  }

  export interface AuthFunction {
    id: string
  }
