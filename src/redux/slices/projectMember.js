import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';

export const getProjectMember = createAsyncThunk(
    "projectMember/getProjectMember",
    async ({id}, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/project-members/get-by-project.php?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

export const createProjectMember = createAsyncThunk(
    "projectMember/createProjectMember",
    async ({data}, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/project-members/create.php`, data,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error create data"));
        }
    }
);

export const updateProjectMember = createAsyncThunk(
    "projectMember/updateProjectMember",
    async ({id, data}, { rejectWithValue }) => {
        try {
            const response = await request.put(`/modular/project-members/update.php?id=${id}`, data,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error update data"));
        }
    }
);

export const deleteProjectMember = createAsyncThunk(
    "projectMember/deleteProjectMember",
    async ({id}, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/project-members/delete.php?id=${id}`);
            return response.data;
        }catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error delete data"));
        }
    }
);


const projectMemberSlice = createSlice({
    name: "projectMember",
    initialState: {
        projectMembers: [],
        loadingProjectMembers: false,
        errorProjectMembers: null,
        
        isProjectMemberCreated: false,
        loadingCreatingProjectMember: false,
        errorCreatingProjectMember: null,
        
        isProjectMemberUpdated: false,
        loadingUpdatingProjectMember: false,
        errorUpdatingProjectMember: null,
        
        isProjectMemberDeleted: false,
        loadingDeletingProjectMember: false,
        errorDeletingProjectMember: null,
    },
    reducers: {
        clearCreateProjectMember: (state) => {
            state.isProjectMemberCreated = false;
            state.loadingCreatingProjectMember = false;
            state.errorCreatingProjectMember = null;
        },
        clearUpdateProjectMember: (state) => {
            state.isProjectMemberUpdated = false;
            state.loadingUpdatingProjectMember = false;
            state.errorUpdatingProjectMember = null;
        },
        clearDeleteProjectMember: (state) => {
            state.isProjectMemberDeleted = false;
            state.loadingDeletingProjectMember = false;
            state.errorDeletingProjectMember = null;
        }
    },
    extraReducers: (builder) => {
        // Get Project Members
        builder
            .addCase(getProjectMember.pending, (state) => {
                state.loadingProjectMembers = true;
                state.errorProjectMembers = null;
            })
            .addCase(getProjectMember.fulfilled, (state, action) => {
                state.loadingProjectMembers = false;
                state.projectMembers = action.payload.data;
            })
            .addCase(getProjectMember.rejected, (state, action) => {
                state.loadingProjectMembers = false;
                state.errorProjectMembers = action.payload || "Failed to fetch project members";
            })
            // Create Project Member
            .addCase(createProjectMember.pending, (state) => {
                state.loadingCreatingProjectMember = true;
                state.errorCreatingProjectMember = null;
            })
            .addCase(createProjectMember.fulfilled, (state, action) => {
                state.loadingCreatingProjectMember = false;
                state.isProjectMemberCreated = true;
            })
            .addCase(createProjectMember.rejected, (state, action) => {
                state.loadingCreatingProjectMember = false;
                state.errorCreatingProjectMember = action.payload || "Failed to create project member";
            })
            // Update Project Member
            .addCase(updateProjectMember.pending, (state) => {
                state.loadingUpdatingProjectMember = true;
                state.errorUpdatingProjectMember = null;
            })
            .addCase(updateProjectMember.fulfilled, (state, action) => {
                state.loadingUpdatingProjectMember = false;
                state.isProjectMemberUpdated = true;
            })
            .addCase(updateProjectMember.rejected, (state, action) => {
                state.loadingUpdatingProjectMember = false;
                state.errorUpdatingProjectMember = action.payload || "Failed to update project member";
            })
            // Delete Project Member
            .addCase(deleteProjectMember.pending, (state) => {
                state.loadingDeletingProjectMember = true;
                state.errorDeletingProjectMember = null;
            })
            .addCase(deleteProjectMember.fulfilled, (state, action) => {
                state.loadingDeletingProjectMember = false;
                state.isProjectMemberDeleted = true;
            })
            .addCase(deleteProjectMember.rejected, (state, action) => {
                state.loadingDeletingProjectMember = false;
                state.errorDeletingProjectMember = action.payload || "Failed to delete project member";
            });
    }
});

export const {
    clearCreateProjectMember,
    clearUpdateProjectMember,
    clearDeleteProjectMember
} = projectMemberSlice.actions;
export default projectMemberSlice.reducer;