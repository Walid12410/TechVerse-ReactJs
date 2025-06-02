import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { toast } from 'react-toastify';

export const getContactUs = createAsyncThunk(
    "contactUs/fetchContactUs",
    async ({page, limit}, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/contact-us/get.php?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

export const createContactUs = createAsyncThunk(
    "contactUs/createContactUs",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/contact-us/create.php`, data,{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.error || "Error create data");
            return rejectWithValue((error.response?.data?.error || "Error create data"));
        }
    }
);

export const deleteContactUs = createAsyncThunk(
    "contactUs/deleteContactUs",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/contact-us/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.error || "Error delete data");
            return rejectWithValue((error.response?.data?.error || "Error delete data"));
        }
    }
);

export const deleteAllContactUs = createAsyncThunk(
    "contactUs/deleteAllContactUs",
    async (_, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/contact-us/delete-all.php`);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.error || "Error delete all data");
            return rejectWithValue((error.response?.data?.error || "Error delete all data"));
        }
    }
);
const contactUsSlice = createSlice({
    name: "contactUs",
    initialState: {
        contactUs: [],
        loadingContactUs: false,
        errorContactUs: null,
        totalPages: 0,
        totalRecords: 0,
        itemsPerPage: 10,
        isCreateContactUs: false,
        loadingCreateContactUs: false,
        errorCreateContactUs: null,
        isDeleteContactUs: false,
        loadingDeleteContactUs: false,
        errorDeleteContactUs: null,
        isDeleteAllContactUs: false,
        loadingDeleteAllContactUs: false,
        errorDeleteAllContactUs: null
    },
    reducers: {
        clearCreateContactUs: (state) => {
            state.errorCreateContactUs = null;
            state.loadingCreateContactUs = false;
            state.isCreateContactUs = false;
        },
        clearDeleteContactUs: (state) => {
            state.errorDeleteContactUs = null;
            state.loadingDeleteContactUs = false;
            state.isDeleteContactUs = false;
        },
        clearDeleteAllContactUs: (state) => {
            state.errorDeleteAllContactUs = null;
            state.loadingDeleteAllContactUs = false;
            state.isDeleteAllContactUs = false;
        }
    },
    extraReducers: (builder) => {
        // fetch contact us
        builder
            .addCase(getContactUs.pending, (state) => {
                state.loadingContactUs = true;
                state.errorContactUs = null;
            })
            .addCase(getContactUs.fulfilled, (state, action) => {
                state.loadingContactUs = false;
                state.contactUs = action.payload.data;
                state.totalPages = action.payload.pagination.total_pages;
                state.totalRecords = action.payload.pagination.total_records;
                state.itemsPerPage = action.payload.pagination.limit;
            })
            .addCase(getContactUs.rejected, (state, action) => {
                state.loadingContactUs = false;
                state.errorContactUs = action.payload || "Failed to fetch contact us";
            });
        // create contact us
        builder
            .addCase(createContactUs.pending, (state) => {
                state.loadingCreateContactUs = true;
                state.errorCreateContactUs = null;
            })
            .addCase(createContactUs.fulfilled, (state, action) => {
                state.loadingCreateContactUs = false;
                state.isCreateContactUs = true;
            })
            .addCase(createContactUs.rejected, (state, action) => {
                state.loadingCreateContactUs = false;
                state.errorCreateContactUs = action.payload || "Failed to create contact us";
            });
        // delete contact us
        builder
            .addCase(deleteContactUs.pending, (state) => {
                state.loadingDeleteContactUs = true;
                state.errorDeleteContactUs = null;
            })
            .addCase(deleteContactUs.fulfilled, (state, action) => {
                state.loadingDeleteContactUs = false;
                state.isDeleteContactUs = true;
            })
            .addCase(deleteContactUs.rejected, (state, action) => {
                state.loadingDeleteContactUs = false;
                state.errorDeleteContactUs = action.payload || "Failed to delete contact us";
            });
        // delete all contact us
        builder
            .addCase(deleteAllContactUs.pending, (state) => {
                state.loadingDeleteAllContactUs = true;
                state.errorDeleteAllContactUs = null;
            })
            .addCase(deleteAllContactUs.fulfilled, (state, action) => {
                state.loadingDeleteAllContactUs = false;
                state.isDeleteAllContactUs = true;
            })
            .addCase(deleteAllContactUs.rejected, (state, action) => {
                state.loadingDeleteAllContactUs = false;
                state.errorDeleteAllContactUs = action.payload || "Failed to delete all contact us";
            });
    }
});

export const {clearUpdateContactUs, 
    clearCreateContactUs, 
    clearDeleteContactUs,
    clearDeleteAllContactUs
} = contactUsSlice.actions;
export default contactUsSlice.reducer;