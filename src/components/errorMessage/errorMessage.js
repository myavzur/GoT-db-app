import React from 'react';

function ErrorMessage({text = 'Sorry! An error Occurred. Please try again later...'}) {
    return <span> {text} </span>
}

export default ErrorMessage;