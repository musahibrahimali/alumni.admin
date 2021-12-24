import React from 'react';
import Router from 'next/router';

const Home = () => {
  React.useEffect(() => {
    Router.push('/admin/dashboard');
  });
  return <div />
}


export default Home;
