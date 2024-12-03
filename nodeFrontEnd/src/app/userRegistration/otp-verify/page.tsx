'use client';

import React, { useState, useEffect } from 'react';
import styles from '../../styles/verifyOtpComponent.module.css';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/library/hooks';
import { verifyOtp } from '@/library/features/users/usersSlice';
import VerifyOtpForm from '@/app/components/verifyOtpComponent';

const otpVerifyForm: React.FC = () => {


  return (
   <main>
    <VerifyOtpForm/>
   </main>
    
  );
};

export default otpVerifyForm;
