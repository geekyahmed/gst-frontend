
import CookieService from '../cookie.service'

export default function authHeader() {
  let token = CookieService.getToken()

  console.log(token)

  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}
