import axios from 'axios';
const url='http://localhost:5000';

export const signIn=(user)=>axios.post(`${url}/auth/local/signin`,user);
export const verify=(token)=>axios.post(`${url}/auth/local/verify`,token);