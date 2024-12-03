'use client';

import React, { useState } from 'react';
import EmployeeList from '../components/employeeList';
import SideNav from "../components/sidebar";
import SimpleComponent from '../components/simpleComponent';
import DashboardHeader from '../components/headerComponent';
import { UserData } from '@/library/types';
import { useAppDispatch, useAppSelector } from '@/library/hooks';
import { addEmployee } from '@/library/features/employees/employeeSlice';
import { registerUser } from '@/library/features/users/usersSlice';
import styles from '../styles/registrationComponent.module.css';
import { useRouter } from 'next/navigation';


const UserRegistration: React.FC = () => {

    const router = useRouter();

    const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(state => state.users);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstname, lastname, username, email, password } = formData;

    if (!firstname || !lastname || !username || !email || !password) {
      alert('All fields are required');
      return;
    }

    dispatch(registerUser({ firstname, lastname, username, email, password }));
    router.push('/userRegistration/otp-verify');
  };

  

  return (
    <main>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
      <div className={styles.formGroup}>
        <label htmlFor="firstname" className={styles.label}>First Name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lastname" className={styles.label}>Last Name</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.label}>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      {error && <p className={styles.errorMsg}>{error}</p>}
      {success && <p className={styles.successMsg}>Registration successful! You can now log in.</p>}
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
    </main>
  );
};

export default UserRegistration;
