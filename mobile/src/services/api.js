import Axios from 'axios';

const Api = Axios.create({
    baseURL: 'http://192.168.100.11:3333'
});

export default Api;