import React from 'react';

import loading from '../svgs/loading.svg'

const Loading = props => (
    <div className={props.isFullPage ? `loading loading--full-screen` : `loading loading--inline`}>
        <img src={loading} className="loading__image" alt="Loading..."/>
    </div>
);

export default Loading;