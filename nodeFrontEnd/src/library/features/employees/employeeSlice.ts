import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserData, ImportMeta } from '../../types';
import { RootState } from '@/library/store';


const apiUrl = import.meta.env.VITE_URL;

interface EmployeesState {
  list: UserData[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  employeesPerPage: number;
}

const initialState: EmployeesState = {
  list: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  employeesPerPage: 5,
};

export const fetchEmployees = createAsyncThunk(
  'employees/fetchAll',
  async ({ page = 1, term = '' }: { page?: number; term?: string }, { getState }) => {
    try {
      const state = getState() as RootState;
      const { employeesPerPage } = state.employees;
      const response = await fetch(
        `${VITE_URL}/api/employees/search?page=${page}&limit=${employeesPerPage}&term=${term}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      console.log(data);
      return data; // Assuming your API response structure includes 'employees' array and 'totalEmployees'
    } catch (error) {
      throw new Error('Failed to fetch employees');
    }
  }
);


export const addEmployee = createAsyncThunk('employees/add', async (formData: FormData) => {
  try {
    const response = await fetch('http://localhost:1000/api/employees', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to add employee');
    }

    const data = await response.json();
    return data; // Assuming your API returns the newly added employee data
  } catch (error) {
    throw new Error('Failed to add employee');
  }
});

export const updateEmployee = createAsyncThunk('employees/update', async ({ _id, formData }: { _id: string; formData: FormData }) => {
  try {
    const response = await fetch(`http://localhost:1000/api/employees/update`, {
      method: 'PUT',
      body: formData,
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to update employee');
    }

    const data = await response.json();
    return data; // Assuming your API returns the updated employee data
  } catch (error) {
    throw new Error('Failed to update employee');
  }
});

export const searchEmployees = createAsyncThunk(
  'employees/search',
  async ({ term }: { term: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:1000/api/employees/search?term=${term}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to search employees');
      }

      const data = await response.json();
      return data.employees; // Assuming your API response structure includes 'employees' array
    } catch (error) {
      return rejectWithValue('An error occurred while searching employees.');
    }
  }
);

export const deleteEmployee = createAsyncThunk('employees/delete', async (id: string) => {
  try {
    const response = await fetch(`http://localhost:1000/api/employees/${id}`, {
      method: 'DELETE',
      credentials: 'include', // Add this if you are using cookies for authentication
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
    
    return id;
  } catch (error) {
    throw new Error('Failed to delete employee');
  }
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {

    setEmployeesPerPage(state, action: PayloadAction<number>) {
      state.employeesPerPage = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
    .addCase(fetchEmployees.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<{ employees: UserData[], totalEmployees: number }>) => {
      state.loading = false;
      state.list = action.payload.employees;
      state.totalPages = Math.ceil(action.payload.totalEmployees / state.employeesPerPage);
    })
    .addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error fetching employees';
    })
      .addCase(addEmployee.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.list.unshift(action.payload); // Add the new employee at the top of the list
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to add employee';
      })
      .addCase(searchEmployees.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEmployees.fulfilled, (state, action: PayloadAction<UserData[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(searchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        const updatedEmployee = action.payload;
        state.list = state.list.map(employee =>
          employee._id === updatedEmployee._id ? updatedEmployee : employee
        );
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to update employee';
      })
      .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<string>) => {
        state.list = state.list.filter(employee => employee._id !== action.payload);
      });
  },
});

export const {setEmployeesPerPage, setCurrentPage } = employeesSlice.actions;


export default employeesSlice.reducer;
