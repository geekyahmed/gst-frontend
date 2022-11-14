import APIService from './api/api.service';

class TimetableService {
  getTimetables() {
    return APIService.getWithAuth('timetables');
  }
  getTimetable() {
    return APIService.postWithAuth('timetable');
  }
  getTimetableInfo(id) {
    return APIService.getWithAuth(`timetables/${id}`);
  }
  createTimetable(data) {
    return APIService.postWithAuth('timetables', data);
  }
  updateTimetable(id, data) {
    return APIService.putWithAuth(`timetables/${id}`, data);
  }
  deleteTimetable(id) {
    return APIService.deleteWithAuth(`timetables/${id}`);
  }
}

export default new TimetableService();
