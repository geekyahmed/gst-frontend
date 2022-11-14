import APIService from './api/api.service'
import CookieService from './cookie.service'

class AuthService {

  register(user) {
    return APIService.post('auth/register', {
      name: user.name,
      role: user.role,
      email: user.email,
      password: user.password
    })
  }

  login(user) {
    return APIService.post('auth/login', {
      email: user.email,
      password: user.password
    })
      .then(async response => {
        CookieService.storeToken(response.data.data.token.token)

        return response.data
      })
  }

  getProfile() {
    return APIService.getWithAuth('auth/profile')
  }

  logout() {
    CookieService.removeToken()

    return APIService.getWithAuth('auth/logout')
  }
}

export default new AuthService();
