// src/app/components/employeePerPage.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/library/hooks';
import { setEmployeesPerPage, fetchEmployees } from '@/library/features/employees/employeeSlice';

const EmployeePerPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const employeesPerPage = useAppSelector((state) => state.employees.employeesPerPage);
  const {  currentPage } = useAppSelector(state => state.employees);
console.log('perpage');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const perPage = Number(event.target.value);
    dispatch(setEmployeesPerPage(perPage));
    dispatch(fetchEmployees({ page: currentPage }));
  };

  return (
    <div>
      <label htmlFor="employeesPerPage"  style={{
  fontSize: '21px',
  fontWeight: 700,
  color: 'rgba(43, 54, 116, 1)',
}}>Employees Per Page: </label>
      <select id="employeesPerPage" value={employeesPerPage} onChange={handleChange}  style = {{
  border: 'solid rgba(255, 255, 255, 1)',
  borderRadius: '5px',
}}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default EmployeePerPage;
