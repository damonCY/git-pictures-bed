import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:4000',
  timeout: 20000
});


export default {
  getData() {
    return instance
            .get('/list')
            .then(data => {
              return data
            })
  }
}