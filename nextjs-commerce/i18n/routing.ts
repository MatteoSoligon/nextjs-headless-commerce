import {defineRouting} from 'next-intl/routing';
import {locales} from '../config/localeConfig';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,
 
  // Used when no locale matches
  defaultLocale: 'en',

  // ** customize the user-facing prefix **
  /* locales: ['en-US', 'de-AT', 'zh'],
  defaultLocale: 'en-US',
  localePrefix: {
    mode: 'always',
    prefixes: {
      'en-US': '/us',
      'de-AT': '/eu/at'
      // (/zh will be used as-is)
    }
  } */

  // ** configure domain-based routing **
  /* domains: [
    {
      domain: 'us.example.com',
      defaultLocale: 'en-US',
      locales: ['en-US']
    },
    {
      domain: 'ca.example.com',
      defaultLocale: 'en-CA',
      locales: ['en-CA', 'fr-CA']
    },
    {
      domain: 'fr.example.com',
      defaultLocale: 'fr-FR',
      locales: ['fr-FR']
    }
  ], */
 
  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    '/': '/',
    '/blog': '/blog',
 
    // If locales use different paths, you can
    // specify the relevant external pathnames
    '/services': {
      de: '/leistungen'
    },
 
    // Encoding of non-ASCII characters is handled
    // automatically where relevant
    '/about': {
      de: '/über-uns'
    },
 
    // Dynamic params are supported via square brackets
    '/news/[articleSlug]': {
      de: '/neuigkeiten/[articleSlug]'
    },
 
    // Static pathnames that overlap with dynamic segments
    // will be prioritized over the dynamic segment
    '/news/just-in': {
      de: '/neuigkeiten/aktuell'
    },
 
    // Also (optional) catch-all segments are supported
    '/categories/[...slug]': {
      de: '/kategorien/[...slug]'
    }
  }
});