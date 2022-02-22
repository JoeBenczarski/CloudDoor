import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UnlockRequestsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DoorsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UnlockRequests {
  readonly id: string;
  readonly serial_number: string;
  readonly request_user_id: string;
  readonly request_time: string;
  readonly approval_user_id?: string;
  readonly approval_time?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UnlockRequests, UnlockRequestsMetaData>);
  static copyOf(source: UnlockRequests, mutator: (draft: MutableModel<UnlockRequests, UnlockRequestsMetaData>) => MutableModel<UnlockRequests, UnlockRequestsMetaData> | void): UnlockRequests;
}

export declare class Doors {
  readonly id: string;
  readonly serial_number: string;
  readonly allowed_unlock_group: string;
  readonly allowed_unlock_time_start: string;
  readonly allowed_unlock_time_end: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Doors, DoorsMetaData>);
  static copyOf(source: Doors, mutator: (draft: MutableModel<Doors, DoorsMetaData>) => MutableModel<Doors, DoorsMetaData> | void): Doors;
}