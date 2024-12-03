import React, { useState } from 'react';
import { useAppDispatch } from '@/library/hooks';
import { fetchEmployees } from '@/library/features/employees/employeeSlice';

const DashboardHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchEmployees({ term: searchTerm }));
    console.log('sear');
  };

  return (
    <div className="main-page-header d-flex justify-content-between align-items-center">
      <div className="main-page-header-title d-flex flex-column">
        <span className="main-page-header-title-1">Dashboard/Employees</span>
        <span className="main-page-header-title-2">Employees</span>
      </div>
      <div className="main-page-header-search-section d-flex align-items-center">
        <form className="search-bar" onSubmit={handleSearch}>
          <div>
            <input
              type="text"
              id="searchInput"
              className="form-control m"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit">Search</button>
        </form>
        <div className="bell-icon">
          <img src="images/bell-icon.svg" alt="" />
        </div>
        <div className="face-pic">
          <img src="images/face.jpeg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
