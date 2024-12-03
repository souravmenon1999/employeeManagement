import React from 'react';
import { UserData } from '@/library/types';
import { useAppSelector } from '@/library/hooks';
import  '../styles/viewSection.css';

interface ViewSectionProps {
  employeeId: string | null;
  onEdit: (employee: UserData) => void;
  onDelete: (employee: UserData) => void;
}

const ViewSection: React.FC<ViewSectionProps> = ({ employeeId, onEdit, onDelete }) => {

  const employee = useAppSelector((state) => {
    if (employeeId) {
      return state.employees.list.find((emp) => emp._id === employeeId) || null;
    }
    return null;
  });

  if (!employee) return <div>No employee selected</div>;

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const age = calculateAge(employee.dob);

  return (
    <div className="profile-view-section" style={{ background: 'rgba(244, 247, 254, 1)' }}>
      <div className="view-details-section">
        <div className="cover-image">
          <img className='background-img' src="images/cover-image.jpeg" alt="" />
          <img className="viewDetailsFacePic" id="profile-pic" src={employee.image} alt="Profile" />
        </div>
       
        <div className="profile-header"></div>
      </div>
      <div className="view-section-header d-flex flex-column align-items-center">
       
        <span className="employeeName" id="name">{employee.firstName} {employee.lastName}</span>
        <span className="employeeEmail" id="email">{employee.email}</span>
      </div>
      <div className="row text-center section-body">
        <div className="col dataBox" id="gender">
          <span className="subheading">Gender</span><br />{employee.gender}
        </div>
        <div className="col dataBox" id="age">
          <span className="subheading">Age</span><br />{age}
        </div>
        <div className="col dataBox" id="dob">
          <span className="subheading">Date of Birth</span><br />{employee.dob}
        </div>
      </div>
      <div className="row text-center section-body">
        <div className="col dataBox" id="phone">
          <span className="subheading">Mobile Number</span><br />{employee.phone}
        </div>
        <div className="col dataBox" id="qualifications">
          <span className="subheading">Qualifications</span><br />{employee.qualifications}
        </div>
      </div>
      <div className="row text-center section-body">
        <div className="col dataBox" id="address">
          <span className="subheading">Address</span><br />{employee.address}
        </div>
        <div className="col dataBox" id="username">
          <span className="subheading">Username</span><br />{employee.username}
        </div>
      </div>

      <div   style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',gap: '10px', }}>



      <button style={{ display: 'block', padding: '10px 20px',  backgroundColor: '#007bff',color: 'white',border: 'none', borderRadius: '4px',cursor: 'pointer'
  }} onClick={() => onEdit(employee)}>Edit</button>
      <button style={{
    display: 'block', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none',
    borderRadius: '4px', cursor: 'pointer'
  }} onClick={() => onDelete(employee)}>Delete</button>
      </div>
      
    </div>
  );
};

export default ViewSection;
