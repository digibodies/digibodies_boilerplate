// TODO: This needs to support resolving og:url missing

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  TITLE_SUFFIX,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_SOCIAL_IMAGE_URL,
  DEFAULT_SOCIAL_IMAGE_HEIGHT,
  DEFAULT_SOCIAL_IMAGE_WIDTH,
  ENABLE_TWITTER_META,
  DEFAULT_TWITTER_SITE,
  DEFAULT_TWITTER_CREATOR,
  DEFAULT_OG_SITE_NAME,
  FACEBOOK_APP_ID
} from '../constants';

// OG Type constants
export const PAGE_TYPES = {
  ARTICLE: 'article',
  EVENT: 'event',
  WEBSITE: 'website',
  PLACE: 'place'
};

// Prep Default Meta
let defaultMeta = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  image: DEFAULT_SOCIAL_IMAGE_URL,
  imageHeight: DEFAULT_SOCIAL_IMAGE_HEIGHT,
  imageWidth: DEFAULT_SOCIAL_IMAGE_WIDTH,
  type: PAGE_TYPES.WEBSITE
};

const shapeMeta = rawdata => {
  let meta = { ...defaultMeta, ...rawdata };

  // Setup Meta Tags ....
  let metaData = { title: null, meta: [] };

  // Title
  metaData['title'] = meta.title;
  metaData['meta'].push({ property: 'og:title', content: meta.title });
  metaData['meta'].push({ itemProp: 'name', content: meta.title });

  // Description
  metaData['meta'].push({ name: 'description', content: meta.description });
  metaData['meta'].push({
    property: 'og:description',
    content: meta.description
  });
  metaData['meta'].push({ itemProp: 'description', content: meta.description });

  // Images
  metaData['meta'].push({ name: 'image', content: meta.image });
  metaData['meta'].push({ property: 'og:image', content: meta.image });
  metaData['meta'].push({
    property: 'og:image:height',
    content: meta.imageHeight
  });
  metaData['meta'].push({
    property: 'og:image:width',
    content: meta.imageWidth
  });

  // Twitter Specific - Note: Twitter summary card with large image must be at least 280x150px
  if (ENABLE_TWITTER_META) {
    metaData['meta'].push({
      name: 'twitter:card',
      content: 'summary_large_image'
    });
    metaData['meta'].push({
      name: 'twitter:site',
      content: DEFAULT_TWITTER_SITE
    });
    metaData['meta'].push({ name: 'twitter:title', content: meta.title });
    metaData['meta'].push({
      name: 'twitter:description',
      content: meta.description
    });
    metaData['meta'].push({
      name: 'twitter:creator',
      content: DEFAULT_TWITTER_CREATOR
    });
    metaData['meta'].push({ name: 'twitter:image:src', content: meta.image });
  }

  // Facebook/OpenGraph specific

  if (FACEBOOK_APP_ID) {
    metaData['meta'].push({
      property: 'fb:app_id',
      content: FACEBOOK_APP_ID
    });
  }

  metaData['meta'].push({ property: 'og:type', content: meta.type });
  metaData['meta'].push({
    property: 'og:site_name',
    content: DEFAULT_OG_SITE_NAME
  });
  metaData['meta'].push({ property: 'og:locale', content: 'en_US' });

  if (metaData.author) {
    metaData['meta'].push({ name: 'author', content: meta.author });
    metaData['meta'].push({ property: 'author', content: meta.author });
  }

  return metaData;

  /*
   <!-- Open Graph data -->
         <meta property="og:type" content="article" />
      <meta property="og:url" content="http://www.example.com/" />
      <meta property="og:image" content="http://example.com/image.jpg" />
      <meta property="og:description" content="Description Here" />
      <meta property="og:site_name" content="Site Name, i.e. Moz" />
      <meta property="article:published_time" content="2013-09-17T05:59:00+01:00"  />
      <meta property="article:modified_time" content="2013-09-16T19:08:47+01:00"  />
      <meta property="article:section" content="Article Section"  />
      <meta property="article:tag" content="Article Tag"  />
      <meta property="fb:admins" content="Facebook numberic ID"  />
      */
};

const Meta = ({ meta }) => {
  let preppedMetaData = shapeMeta(meta);

  // Convert prepped data to actual tags required for next/Head
  // Render the tags
  let renderedTags = preppedMetaData.meta.map((data, i) => {
    return <meta key={i} {...data} />;
  });

  // Render HTML meta tags - Next adds them automatically to the HEAD tag
  return (
    <Head>
      <title>
        {preppedMetaData.title} {TITLE_SUFFIX}
      </title>
      {renderedTags}
    </Head>
  );
};

Meta.propTypes = {
  meta: PropTypes.object
};
export default Meta;
