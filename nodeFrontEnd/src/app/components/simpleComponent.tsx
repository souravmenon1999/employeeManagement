'use client';

import React, { useState, useEffect } from 'react';
import { UserData } from '@/library/types';
import { useAppDispatch } from '@/library/hooks';
import { addEmployee, updateEmployee } from '@/library/features/employees/employeeSlice';
import '../styles/simpleComponent.css';
import 'remixicon/fonts/remixicon.css'

interface SimpleComponentProps {
  isVisible: boolean;
  onClose: () => void;
  employee: UserData | null;
}

const SimpleComponent: React.FC<SimpleComponentProps> = ({ isVisible, onClose, employee }) => {
  const dispatch = useAppDispatch();

  const [salutation, setSalutation] = useState('Mr');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [qualifications, setQualifications] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (employee) {
      setSalutation(employee.salutation);
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setPhone(employee.phone);
      setDob(employee.dob);
      setGender(employee.gender);
      setQualifications(employee.qualifications);
      setAddress(employee.address);
      setCountry(employee.country);
      setState(employee.state);
      setCity(employee.city);
      setPin(employee.pin);
      setUsername(employee.username);
      setPassword(employee.password);
      if (employee.image) {
        setImagePreview(employee.image);
      }
    }
  }, [employee]);

  if (!isVisible) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('salutation', salutation);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('qualifications', qualifications);
    formData.append('address', address);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('pin', pin);
    formData.append('username', username);
    formData.append('password', password);
    if (image) {
      formData.append('image', image);
    }
    if (employee) {
      formData.append('_id', employee._id);
      dispatch(updateEmployee({ _id: employee._id, formData }));
    } else {
      dispatch(addEmployee(formData));
    }
    handleClose();
  };

  const handleClose = () => {
    setSalutation('Mr');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setDob('');
    setGender('Male');
    setQualifications('');
    setAddress('');
    setCountry('');
    setState('');
    setCity('');
    setPin('');
    setImage(null);
    setImagePreview(null);
    setPassword('');
    setUsername('');
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button className="close" onClick={handleClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
              <label>Image</label>
              <div className="image-upload">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="image-preview">
                  <i className="ri-upload-line" style={{ fontSize: '68px', color: 'rgba(178, 186, 208, 1)' }}></i>
                </div>
                )}
                 <label htmlFor="file-input" className="custom-file-input" style={{marginTop: '8%', }}>
        Choose File
      </label>
      <input id="file-input" type="file" onChange={handleImageChange} />
              </div>
            </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salutation</label>
              <select value={salutation} onChange={(e) => setSalutation(e.target.value)}>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
              </select>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
           
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
            </div>

          </div>
          <div className="form-row">
            
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value) }>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            
            <div className="form-group">
              <label>Qualifications</label>
              <input type="text" value={qualifications} onChange={(e) => setQualifications(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
          </div>
          <div className="form-row">
          
            <div className="form-group">
              <label>Country</label>
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
            </div>
            
            
          </div>
          <div className="form-row">
          <div className="form-group">
              <label>PIN</label>
              <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
           
          </div>
          <div className="form-row">
           
            
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <button type="submit">{employee ? 'Update' : 'Add'} Employee</button>
        </form>
      </div>
    </div>
  );
};

export default SimpleComponent;
