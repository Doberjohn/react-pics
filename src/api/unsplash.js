import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: "Client-ID 69d13706a3ebe7fb92037a7f44ae2d367bc77f6ad576511187aa75a7e35c938e"
    }
});