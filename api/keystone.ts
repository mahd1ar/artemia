import { resolve } from 'path';
require('dotenv').config({
  override: true,
  path: resolve(
    process.cwd(),
process.env.NODE_ENV === 'production' ? '.env' : `.dev.env`
  ),
});
import {storage} from './storage'
import { config } from '@keystone-6/core';


// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    server: {
      cors: {
        origin: [process.env.FRONTENDURL!],
        credentials: true,
    },
    maxFileSize: 1024_000_000,
      port: 3032
    },
    lists,
    session,
    storage
  })
);
