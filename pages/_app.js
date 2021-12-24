import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { HeadTag } from '../config/config';
import createEmotionCache from "../provider/createEmotionCache";
import { Provider } from 'react-redux';
import store from "../provider/store";
import Router from 'next/router';
import ReactDOM from 'react-dom';
import { PageChange } from "../components/components";
import App from 'next/app';
import React from 'react';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';



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

class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(
      `
        =========================================================
        * * Alumni DashBaord
        =========================================================

        * Coded by Musah Ibrahim Ali

        =========================================================
        `
    );
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps, emotionCache = clientSideEmotionCache } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <CacheProvider value={emotionCache}>
          <HeadTag /> {/*handles seo*/}
          <Provider store={store}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </CacheProvider>
      </React.Fragment>
    );
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;