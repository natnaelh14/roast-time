import axios from 'axios';

export const getSession = () => axios.get('/api/user');
