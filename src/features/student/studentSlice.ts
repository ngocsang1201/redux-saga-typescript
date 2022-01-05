import { RootState } from './../../app/store';
import { PaginationParams, Student, ListParam, ListResponse } from 'models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StudentState {
  loading: boolean;
  list: Student[];
  filter: ListParam;
  pagination: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 10,
  },
  pagination: {
    _page: 1,
    _limit: 10,
    _totalRows: 15,
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParam>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParam>) {
      state.filter = action.payload;
    },

    setFilterWithDebounce(state, action: PayloadAction<ListParam>) {},
  },
});

export const studentActions = studentSlice.actions;

export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

const studentReducer = studentSlice.reducer;
export default studentReducer;
