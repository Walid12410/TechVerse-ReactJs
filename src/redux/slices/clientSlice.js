import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';

export const getClients = createAsyncThunk(
    "member/getClients",
    async ({page, limit}, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/client/get.php?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);


export const createClient = createAsyncThunk(
    "member/createClient",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/client/create.php`,data, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error create data"));
        }
    }
);


export const updateClient = createAsyncThunk(
    "member/updateClient",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/client/update.php?id=${id}`,data, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error update data"));
        }
    }
);


export const deleteClient = createAsyncThunk(
    "member/deleteClient",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/client/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error delete data"));
        }
    }
);


const clientSlice = createSlice({
    name: "client",
    initialState: {
        clients: [],
        loading: false,
        error: null,
        totalPages: 0,  // Total number of pages (this will be returned from API)
        totalRecords: 0, // Total number of records (this will be returned from API)
        itemsPerPage: 10, // Define items per page
        isClientCreate: false,
        loadingCreateClient: false,
        errorCreateClient: null,
        isClientUpdate: false,
        loadingUpdateClient: false,
        errorUpdateClient: null,
        isClientDeleted: false,
        loadingClientDeleting: false,
        errorDeletingClient: null
    },
    reducers: {
        clearCreateClient: (state) => {
            state.errorCreateClient = null;
            state.loadingCreateClient = false;
            state.isClientCreate = false;
        },
        clearUpdateClient: (state) => {
            state.errorUpdateClient = null;
            state.loadingUpdateClient = false;
            state.isClientUpdate = false;
        },
        clearDeleteClient: (state) => {
            state.errorDeletingClient = null;
            state.loadingClientDeleting = false;
            state.isClientDeleted = false;
        }
    },
    extraReducers: (builder) => {
        // fetch clients
        builder
            .addCase(getClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.data;
                state.totalPages = action.payload.pagination.total_pages; // Total pages
                state.totalRecords = action.payload.pagination.total_records; // Total records

            })
            .addCase(getClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch clients";
            });
        // create clients
        builder
            .addCase(createClient.pending, (state) => {
                state.loadingCreateClient = true;
                state.errorCreateClient = null;
            })
            .addCase(createClient.fulfilled, (state) => {
                state.loadingCreateClient = false;
                state.isClientCreate = true;

            })
            .addCase(createClient.rejected, (state, action) => {
                state.loadingCreateClient = false;
                state.errorCreateClient = action.payload || "Failed to create client";
            });
        // update clients
        builder
            .addCase(updateClient.pending, (state) => {
                state.loadingUpdateClient = true;
                state.errorUpdateClient = null;
            })
            .addCase(updateClient.fulfilled, (state) => {
                state.loadingUpdateClient = false;
                state.isClientUpdate = true;
            })
            .addCase(updateClient.rejected, (state, action) => {
                state.loadingUpdateClient = false;
                state.errorUpdateClient = action.payload || "Failed to update client";
            });
        // delete clients
        builder
            .addCase(deleteClient.pending, (state) => {
                state.loadingClientDeleting = true;
                state.errorDeletingClient = null;
            })
            .addCase(deleteClient.fulfilled, (state) => {
                state.loadingClientDeleting = false;
                state.isClientDeleted = true;
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.loadingClientDeleting = false;
                state.errorDeletingClient = action.payload || "Failed to delete client";
            });
    }
});

export const {
    clearCreateClient,
    clearUpdateClient,
    clearDeleteClient
} = clientSlice.actions;
export default clientSlice.reducer;