import Head from 'next/head';
import React from 'react';

import type { Route } from 'nextjs-routes';

import useAdblockDetect from 'lib/hooks/useAdblockDetect';
import useGetCsrfToken from 'lib/hooks/useGetCsrfToken';
import * as metadata from 'lib/metadata';
import * as mixpanel from 'lib/mixpanel';
import useConfigSentry from 'lib/sentry/useConfigSentry';

type Props = Route & {
  children: React.ReactNode;
}

const PageNextJs = (props: Props) => {
  const { title, description, opengraph } = metadata.generate(props);

  useGetCsrfToken();
  useAdblockDetect();
  useConfigSentry();

  const isMixpanelInited = mixpanel.useInit();
  mixpanel.useLogPageView(isMixpanelInited);

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ description }/>

        { /* OG TAGS */ }
        <meta property="og:title" content={ opengraph.title }/>
        { opengraph.description && <meta property="og:description" content={ opengraph.description }/> }
        <meta property="og:image" content={ opengraph.imageUrl }/>
        <meta property="og:type" content="website"/>
      </Head>
      { props.children }
    </>
  );
};

export default React.memo(PageNextJs);
