import React from 'react';
import NextHead from 'next/head';
import {DefaultSeo} from 'next-seo'; // from the next seo
import config from '../seo/seo.json';

/* all seo purpose stuff goes in here for modularization */
// edit the seo.json from the config folder to effect all changes globally
const HeadTag = () => {
    return (
        <>
            <DefaultSeo {...config} /> {/* edit the config with seo friendly things */}
            <NextHead>
                <meta httpEquiv="X-UA-Compatible" content="IE=7"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <meta name="keywords"
                    content="university, senior high schools, junior high schools, primary and KG friends all on one platform making merry"/>
                <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content=""/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="theme-color" content="#ffffff"/>
                <link rel="manifest" href="/site.webmanifest" key="site-manifest"/>
            </NextHead>
        </>
    );
}

export default HeadTag;