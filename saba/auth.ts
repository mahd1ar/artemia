

import { randomBytes } from 'crypto';
import { createAuth } from '@keystone-6/auth';

import { statelessSessions } from '@keystone-6/core/session';

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== 'production') {
  sessionSecret = "78f9ecc4e141d1ff5250da33bd26836382f0c7fe8e8e37e118c973ac6541d5b7" //randomBytes(32).toString('hex');
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name createdAt role',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password', 'role'],
  },
});

const sessionMaxAge = 60 * 60 * 24 * 30;

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
});

export { withAuth, session };
