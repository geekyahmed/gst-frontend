import APIService from './api/api.service';

class UserService {
  getUsers() {
    console.log('Gize')
    return APIService.getWithAuth('users');
  }
  getUser() {
    return APIService.postWithAuth('auth/user');
  }
  getUserInfo(id) {
    return APIService.getWithAuth(`users/${id}`);
  }
  createUser(data) {
    return APIService.postWithAuth('users', data);
  }
  updateUser(id, data) {
    return APIService.putWithAuth(`users/${id}`, data);
  }
  deleteUser(id) {
    return APIService.deleteWithAuth(`users/${id}`);
  }
}

export default new UserService();
