'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/verifyOtpComponent.module.css';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/library/hooks';
import { verifyOtp } from '@/library/features/users/usersSlice';

const VerifyOtpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, otpVerified } = useAppSelector(state => state.users);

  const [otp, setOtp] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setEmail(query.get('email') || '');
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp) {
      alert('OTP is required');
      return;
    }

    dispatch(verifyOtp({ email, otp }));
  };

  useEffect(() => {
    if (otpVerified) {
      router.push('/'); // Redirect to login page after OTP verification
    }
  }, [otpVerified, router]);

  return (
    <form onSubmit={handleSubmit} className={styles.verifyOtpForm}>
      <div className={styles.formGroup}>
        <label htmlFor="otp" className={styles.label}>OTP</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      {error && <p className={styles.errorMsg}>{error}</p>}
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </form>
  );
};

export default VerifyOtpForm;
