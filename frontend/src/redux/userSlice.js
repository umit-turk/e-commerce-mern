import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isAuth:false,
  loading:false,
}

export const register = createAsyncThunk(
    'register',
    async (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
      const response = await fetch(`http://localhost:4000/register`,requestOptions)
      let res = await response.json();
      return res
    }
)

export const login = createAsyncThunk(
    'login',
    async (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
      const response = await fetch(`http://localhost:4000/login`,requestOptions)
      let res = await response.json();
      return res
    }
)

export const profile = createAsyncThunk(
    'profile',
    async () => {
      const response = await fetch(`http://localhost:4000/me`, {
        credentials: 'include',
      });
      return (await response.json());
    }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state,action) => {
        state.loading = true
        state.isAuth = false
    });
    builder.addCase(register.fulfilled, (state,action) => {
        state.loading = false;
        state.isAuth = true
        state.user = action.payload
    })
    builder.addCase(login.pending, (state,action) => {
        state.loading = true
        state.isAuth = false
    });
    builder.addCase(login.fulfilled, (state,action) => {
        state.loading = false;
        state.isAuth = true
        state.user = action.payload
    })
    builder.addCase(profile.pending, (state,action) => {
        state.loading = true
        state.isAuth = false
    });
    builder.addCase(profile.fulfilled, (state,action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true
    })
  }
})

// Action creators are generated for each case reducer function
export const {  } = userSlice.actions

export default userSlice.reducer