import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { useState } from 'react';
import EmployeeList from './employeeList';
import SimpleComponent from './simpleComponent';
import { UserData } from '@/library/types';






export default function MainSection() {

    const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<UserData | null>(null);

  
    const handleOpenModal = () => {
        setSelectedEmployee(null);
        setModalVisible(true);
      };

      const handleEditEmployee = (employee: UserData) => {
        setSelectedEmployee(employee);
        setModalVisible(true);
      };


      
      const handleCloseModal = () => {
        setModalVisible(false);
      };


    return (

        <section>
             <button onClick={handleOpenModal}>Adddddddd Employee</button>
          <EmployeeList onEditEmployee={handleEditEmployee} onViewEmployee={handleViewEmployee} />
          {isModalVisible && (
            <SimpleComponent
              isVisible={isModalVisible}
              onClose={handleCloseModal}
              employee={selectedEmployee} // Pass the selected employee or null for adding a new employee
            />
          )}
        </section>
       
    );
}