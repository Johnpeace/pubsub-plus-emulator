import { publisher } from './event';

const payload = {
  firstName: 'Ropo',
  lastName: 'Olatujoye',
  twitter: '@iamfiropo',
};

publisher(payload);
