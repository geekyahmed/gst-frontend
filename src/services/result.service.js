import APIService from './api/api.service';

class ResultService {
  getResults() {
    return APIService.getWithAuth('results');
  }
  getResult() {
    return APIService.postWithAuth('result');
  }
  getResultInfo(id) {
    return APIService.getWithAuth(`results/${id}`);
  }
  createResult(data) {
    return APIService.postWithAuth('results', data);
  }
  updateResult(id, data) {
    return APIService.putWithAuth(`results/${id}`, data);
  }
  deleteResult(id) {
    return APIService.deleteWithAuth(`results/${id}`);
  }
}

export default new ResultService();
