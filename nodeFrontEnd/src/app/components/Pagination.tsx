// Pagination.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/library/hooks';
import { fetchEmployees, setCurrentPage } from '@/library/features/employees/employeeSlice';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalPages, currentPage } = useAppSelector(state => state.employees);

  useEffect(() => {
    console.log(currentPage); // Log current page after it changes
  }, [currentPage]);


  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page)); // Dispatch action to update currentPage in Redux
    dispatch(fetchEmployees({ page })); // Fetch employees for the new page
  };

  if (totalPages <= 1) return null;


  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">   
        {[...Array(totalPages)].map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
 