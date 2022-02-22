// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UnlockRequests, Doors } = initSchema(schema);

export {
  UnlockRequests,
  Doors
};