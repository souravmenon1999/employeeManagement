'use client';

import React, { useState } from 'react';
import EmployeeList from '../components/employeeList';
import SideNav from '../components/sidebar';
import SimpleComponent from '../components/simpleComponent';
import DashboardHeader from '../components/headerComponent';
import { UserData } from '@/library/types';
import ViewSection from '../components/viewSection';
import EmployeePerPage from '../components/employeePerPage';

const Dashboard: React.FC = () => {
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<UserData | null>(null);
  const [selectedView, setSelectedView] = useState<UserData | null>(null);
  const [showComponent1, setShowComponent1] = useState(true);

  const handleEditEmployee = (employee: UserData) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const handleOpenModal = () => {
    setSelectedEmployee(null);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEmployee(null);
  };

  const handleReplaceWithComponent2 = (employee: UserData) => {
    setSelectedView(employee);
    setShowComponent1(false);
  };

  const handleReplaceWithComponent1 = () => {
    setShowComponent1(true);
  };

  const handleDeleteEmployee = (employeeId: UserData) => {
    // Implement delete logic here
    console.log('Delete employee:', employeeId);
  };

  return (
    <main>
      <div className='d-flex'>
        <div className='col-sm-3 sidebar col-lg-2 col-xl-2'>
          <SideNav onReplace={handleReplaceWithComponent1} />
        </div>
        <div className='maindiv w-100' style={{ background: 'rgba(244, 247, 254, 1)', height: '100vh', overflow:'scroll' }}>
          <DashboardHeader />
          <div className='employeePerPage-section'    style={{ display: 'flex', alignItems: 'baseline', gap: '29%', margin:'2%' }}>
          <EmployeePerPage/>
          <button 
  onClick={handleOpenModal} 
  style={{
    display: 'block',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
>
  Add Employee
</button>
          </div>
         
        

          {showComponent1 ? (
            <EmployeeList onEditEmployee={handleEditEmployee} onViewEmployee={handleReplaceWithComponent2}  />
          ) : (
            <ViewSection
            employeeId={selectedView?._id || null}
              onEdit={() => handleEditEmployee(selectedView!)}
              onDelete={() => handleDeleteEmployee(selectedView!)}
            />
          )}
          {isModalVisible && (
            <SimpleComponent
              isVisible={isModalVisible}
              onClose={handleCloseModal}
              employee={selectedEmployee} // Pass the selected employee or null for adding a new employee
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
