import APIService from './api/api.service'

class CategoryService {
  getCategories() {
    return APIService.getWithAuth('categories')
  }
  getCategoryDetails(slug) {
    return APIService.getWithAuth('categories/' + slug)
  }
  createCategory(data){
    return APIService.postWithAuth('categories', data)
  }
  updateCategory(slug, data){
    return APIService.putWithAuth('categories/' + slug, data)
  }
  deleteCategory(slug){
    return APIService.deleteWithAuth('categories/' + slug)
  }
}

export default new CategoryService();
