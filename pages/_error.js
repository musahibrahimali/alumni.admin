import React from 'react';
import Router from 'next/router';

const _error = () => {
    React.useEffect(() => {
        Router.push('/admin/error');
    });
    return <div />;
}

export default _error;
