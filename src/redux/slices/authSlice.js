import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await request.get(`/auth/check_auth.php`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/auth/logout.php`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error logout"));
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/auth/login.php`, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error login"));
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        auth: null,
        loadingAuth: false,
        errorAuth: null,
        isLoggedIn: false,
    },
    reducers: {
        clearLogin: (state) => {
            state.errorAuth = null;
            state.loadingAuth = false;
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        // fetch auth
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loadingAuth = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loadingAuth = false;
                state.auth = action.payload.user;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loadingAuth = false;
            });
        // login
        builder
            .addCase(login.pending, (state) => {
                state.loadingAuth = true;
                state.errorAuth = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.auth = action.payload.user;
                state.loadingAuth = false;
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loadingAuth = false;
                state.errorAuth = action.payload || "Failed to login";
            });
        // logout
        builder
            .addCase(logout.fulfilled, (state) => {
                state.auth = null;
            });
    }
});

export const { clearLogin } = authSlice.actions;
export default authSlice.reducer;