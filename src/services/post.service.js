import APIService from './api/api.service'

class PostService {
  getPosts() {
    return APIService.getWithAuth('posts')
  }
  getUserPosts(id) {
    return APIService.getWithAuth('user/' + id + '/posts')
  }
  getOwnPosts(){
    return APIService.getWithAuth('index')
  }
  getPostDetails(slug) {
    return APIService.getWithAuth('posts/' + slug)
  }
  createPost(data){
    return APIService.postWithAuth('posts', data)
  }
  updatePost(slug, data){
    return APIService.putWithAuth('posts/' + slug, data)
  }
  deletePost(slug){
    return APIService.deleteWithAuth('posts/' + slug)
  }
}

export default new PostService();
