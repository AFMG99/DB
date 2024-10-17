import React from 'react'
import { parseJwt } from '../Service/ParseJtw'
import Login from './Login'
import Principal from './Principal'

const Main = () => {
    const token = localStorage.getItem('token');
    let tokenValid = false;

    if (token) {
        const { exp } = parseJwt(token);
        tokenValid = exp * 1000 > Date.now();
    }

    return (
    <>{tokenValid ? <Principal /> : <Login />}</>
  )
}

export default Main
