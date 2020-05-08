import Axios from 'axios'
import store from '@client/store/'

const axios = Axios.create({
  baseURL: '/api/v1/',
})

axios.interceptors.request.use(function (config) {
  if (!!store.state.user && !!store.state.token) {
    config.headers = {
      access_token: store.state.token,
    }
  }

  return config
})

export default axios
