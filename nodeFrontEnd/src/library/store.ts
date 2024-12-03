import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from './features/employees/employeeSlice';
import usersSlice from './features/users/usersSlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      employees: employeesSlice,
      users: usersSlice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
