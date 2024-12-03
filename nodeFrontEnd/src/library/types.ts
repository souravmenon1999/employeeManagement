// src/types.ts
export interface UserData {
  _id: string;
  user_id: string;
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  qualifications: string;
  address: string;
  city: string;
  state: string;
  country: string;
  dob: string;
  gender: string;
  username: string;
  password: string;
  pin: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface ImportMetaEnv {
  VITE_URL: string;
 
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}