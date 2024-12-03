'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/loginform.module.css';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/library/hooks';
import { loginUser } from '@/library/features/users/usersSlice'; // Make sure the import path is correct
import MoonLoader from "react-spinners/ClipLoader";


const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { isAuthenticated, loading, error } = useAppSelector(state => state.users);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMsg('Email and password are required');
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
      {loading ? (
        <div  style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
            <MoonLoader/>
        </div>
        
      ) : (
        <div className={styles.bottom}>
        <div className='bottom-section'>
          <button type="submit" className={styles.button}>Log In</button>
        </div>
        <br />
        <div className='bottom-section'>
          <button type="button" onClick={() => router.push('/userRegistration')} className={styles.button}>Register</button>
        </div>
        </div>
        
      )}
    </form>
  );
};

export default LoginForm;
