import axios from 'axios';
import authHeader from './auth-header';

axios.defaults.baseURL = process.env.VUE_APP_URL

class APIService {
    get(url) {
        return axios({
            method: 'GET',
            url: url
        });
    }
    getWithAuth(url) {
        return axios({
            method: 'GET',
            url: url,
            headers: authHeader()
        })
    }
    post(url, data) {
        return axios({
            method: 'POST',
            url: url,
            data: data,
        });
    }
    postWithAuth(url, data) {
        return axios({
            method: 'POST',
            url: url,
            data: data,
            headers: authHeader()
        });
    }
    putWithAuth(url, data) {
        return axios({
            method: 'PUT',
            url: url,
            data: data,
            headers: authHeader()
        });
    }
    deleteWithAuth(url, data) {
        return axios({
            method: 'DELETE',
            url: url,
            data: data,
            headers: authHeader()
        });
    }
}

export default new APIService();
