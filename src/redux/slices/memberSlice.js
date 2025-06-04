import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';

export const getMembers = createAsyncThunk(
    "member/getMembers",
    async ({page, limit}, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/member/get.php?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);


export const createMember = createAsyncThunk(
    "member/createMember",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/member/create.php`,data, 
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


export const updateMember = createAsyncThunk(
    "member/updateMember",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/member/update.php?id=${id}`,data, 
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


export const deleteMember = createAsyncThunk(
    "member/deleteMember",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/member/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error delete data"));
        }
    }
);


const memberSlice = createSlice({
    name: "member",
    initialState: {
        members: [],
        loading: false,
        error: null,
        totalPages: 0,  // Total number of pages (this will be returned from API)
        totalRecords: 0, // Total number of records (this will be returned from API)
        itemsPerPage: 10, // Define items per page
        isMemberCreate: false,
        loadingCreateMember: false,
        errorCreateMember: null,
        isMemberUpdate: false,
        loadingUpdateMember: false,
        errorUpdateMember: null,
        isMemberDeleted: false,
        loadingMemberDeleting: false,
        errorDeletingMember: null
    },
    reducers: {
        clearCreateMember: (state) => {
            state.errorCreateMember = null;
            state.loadingCreateMember = false;
            state.isMemberCreate = false;
        },
        clearUpdateMember: (state) => {
            state.errorUpdateMember = null;
            state.loadingUpdateMember = false;
            state.isMemberUpdate = false;
        },
        clearDeleteMember: (state) => {
            state.errorDeletingMember = null;
            state.loadingMemberDeleting = false;
            state.isMemberDeleted = false;
        }
    },
    extraReducers: (builder) => {
        // fetch members
        builder
            .addCase(getMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload.data;
                state.totalPages = action.payload.pagination.total_pages; // Total pages
                state.totalRecords = action.payload.pagination.total_records; // Total records

            })
            .addCase(getMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch members";
            });
        // create member
        builder
            .addCase(createMember.pending, (state) => {
                state.loadingCreateMember = true;
                state.errorCreateMember = null;
            })
            .addCase(createMember.fulfilled, (state) => {
                state.loadingCreateMember = false;
                state.isMemberCreate = true;

            })
            .addCase(createMember.rejected, (state, action) => {
                state.loadingCreateMember = false;
                state.errorCreateMember = action.payload || "Failed to create member";
            });
        // update member
        builder
            .addCase(updateMember.pending, (state) => {
                state.loadingUpdateMember = true;
                state.errorUpdateMember = null;
            })
            .addCase(updateMember.fulfilled, (state) => {
                state.loadingUpdateMember = false;
                state.isMemberUpdate = true;
            })
            .addCase(updateMember.rejected, (state, action) => {
                state.loadingUpdateMember = false;
                state.errorUpdateMember = action.payload || "Failed to update member";
            });
        // delete member
        builder
            .addCase(deleteMember.pending, (state) => {
                state.loadingMemberDeleting = true;
                state.errorDeletingMember = null;
            })
            .addCase(deleteMember.fulfilled, (state) => {
                state.loadingMemberDeleting = false;
                state.isMemberDeleted = true;
            })
            .addCase(deleteMember.rejected, (state, action) => {
                state.loadingMemberDeleting = false;
                state.errorDeletingMember = action.payload || "Failed to delete member";
            });
    }
});

export const {
    clearCreateMember,
    clearUpdateMember,
    clearDeleteMember
} = memberSlice.actions;
export default memberSlice.reducer;