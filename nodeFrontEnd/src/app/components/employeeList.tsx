import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/library/hooks';
import { fetchEmployees, deleteEmployee } from '@/library/features/employees/employeeSlice';
import Pagination from './Pagination';
import '../styles/employeeList.css';
import { UserData } from '@/library/types';
import SkeletonComponent from '../loadingStates/skeletons';


interface EmployeeListProps {
  onEditEmployee: (employee: UserData) => void;
  onViewEmployee: (employee: UserData) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onEditEmployee, onViewEmployee }) => {
  const dispatch = useAppDispatch();
  const { list, loading, error, currentPage } = useAppSelector(state => state.employees);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  useEffect(() => {
    dispatch(fetchEmployees({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleDelete = (id: string) => {
    dispatch(deleteEmployee(id));
  };

  const handleEdit = (employee: UserData) => {
    onEditEmployee(employee);
  };

  const handleView = (employee: UserData) => {
    console.log('vire');
    
    onViewEmployee(employee);
  };

  if (loading) return <div><SkeletonComponent/></div>;
  if (error) return <div>Error: {error}</div>;
  if (!list) return <div>No employees found.</div>;

  return (
    <div className='EmployeeTable'>
      <h1>Employee List</h1>
      <div>
        {list.length > 0 ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Profile</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((user, i) => (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td className="profilesection">
                      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.gender}</td>
                    <td>{user.dob}</td>
                    <td>{user.country}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle square-button"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <img src="images/three-dots.svg" alt="Actions" />
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => handleView(user)}
                            >
                              View
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => handleEdit(user)}
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => handleDelete(user._id)}
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination />
          </>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
