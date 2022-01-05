import { call, takeLatest, put, debounce } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParam, ListResponse, Student } from 'models';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParam>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list:', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* handleSearchWithDebounce(action: PayloadAction<ListParam>) {
  try {
    yield put(studentActions.setFilter(action.payload));
  } catch (error) {
    console.log('Failed to search student with debounce:', error);
  }
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);

  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchWithDebounce);
}
