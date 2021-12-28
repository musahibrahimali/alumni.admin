import React from 'react';
import PropTypes from 'prop-types';
import { HeadTag } from '../config/config';
import { Provider } from 'react-redux';
import store from "../provider/store";
import Router from 'next/router';
import ReactDOM from 'react-dom';
import { PageChange } from "../components/components";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from "../provider/createEmotionCache";
import '../styles/globals.css';
import appTheme from '../provider/AppTheme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

Router.events.on("routeChangeStart", (url) => {
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

const MyApp = (props) => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <React.Fragment>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={appTheme}>
          <HeadTag /> {/*handles seo*/}
          <Provider store={store}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <Layout>
              <CssBaseline />
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </React.Fragment>
  );
}

// get initial props form alumni
MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;