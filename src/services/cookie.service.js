import Cookies from 'js-cookie'

class CookieService {
  storeToken(token) {
    return Cookies.set('token', token, {expires: 1})
  }
  getToken(){
      return Cookies.get('token')
  }
  removeToken(){
      return Cookies.remove('token')
  }
}

export default new CookieService();
