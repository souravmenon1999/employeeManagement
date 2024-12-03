'use client';
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/library/features/users/usersSlice';



interface SideNavProps {
  onReplace: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ onReplace }) => {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/'); // Adjust the path according to your login route
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title d-flex flex-column">
        <span className="sidebar-title-1">Employee</span>
        <span className="sidebar-title-2">Management</span>
      </div>
      <hr />
      <div className="sidebar-body">
        <div className="sidebar-body-links d-flex flex-column">
          <div className="d-flex link">
            <img src="/images/dashboard.svg" alt="Dashboard" />
            <span> Dashboard </span>
          </div>
          <div className="d-flex link" onClick={onReplace}>
            <img src="/images/employees.svg" alt="Employees" />
            <span> Employees </span>
          </div>
          <div className="d-flex link">
            <img src="/images/profile.svg" alt="My Profile" />
            <span> My Profile</span>
          </div>
          <div className="d-flex link" onClick={handleLogout}>
            <img src="/images/logout.svg" alt="Logout" />
            <span> Logout</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="sidebar-footer d-flex align-items-center justify-content-center">
        <span>Powered by</span>
        <img src="/images/brandnamepng.png" alt="Brand Name" />
      </div>
      
    </div>
  );
};

export default SideNav;
