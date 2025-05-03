import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precaching
precacheAndRoute(self.__WB_MANIFEST);

// Cache API responses
registerRoute(
  ({url}) => url.pathname.startsWith('/api'),
  new StaleWhileRevalidate()
);

// Cache Google Fonts
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate()
);