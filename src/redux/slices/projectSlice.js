import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';


export const getProjects = createAsyncThunk(
    "project/fetchProject",
    async ({page, limit}, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/project/get.php?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

export const getProjectById = createAsyncThunk(
    "project/getProjectById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/project/get-one.php?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);


export const createProject = createAsyncThunk(
    "project/createProject",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/project/create.php`, data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error create data"));
        }
    }
);

export const updateProject = createAsyncThunk(
    "project/updateProject",
    async ({id, data }, { rejectWithValue }) => {
        try {
            const response = await request.put(`/modular/project/update.php?id=${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error update data"));
        }
    }
);

export const deleteProject = createAsyncThunk(
    "project/deleteProject",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/project/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error delete data"));
        }
    }
);

export const createProjectDetail = createAsyncThunk(
    "project/createProjectDetail",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/project-details/create.php`, data,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error create data"));
        }
    }
);

export const deleteProjectDetail = createAsyncThunk(
    "project/deleteProjectDetail",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/project-details/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error delete data"));
        }
    }
);



const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        loadingProjects: false,
        errorProjects: null,
        totalPages: 0,
        totalRecords: 0,
        itemsPerPage: 6,
        
        currentProject: null,
        loadingCurrentProject: false,
        errorCurrentProject: null,
        
        isProjectCreated: false,
        loadingCreatingProject: false,
        errorCreatingProject: null,
        
        isProjectUpdated: false,
        loadingUpdatingProject: false,
        errorUpdatingProject: null,
        
        isProjectDeleted: false,
        loadingDeletingProject: false,
        errorDeletingProject: null,
        
        isProjectDetailCreated: false,
        loadingCreatingProjectDetail: false,
        errorCreatingProjectDetail: null,
        
        isProjectDetailDeleted: false,
        loadingDeletingProjectDetail: false,
        errorDeletingProjectDetail: null,
    },
    reducers: {
        clearCurrentProject: (state) => {
            state.currentProject = null;
            state.loadingCurrentProject = false;
            state.errorCurrentProject = null;
        },
        clearCreateProject: (state) => {
            state.isProjectCreated = false;
            state.loadingCreatingProject = false;
            state.errorCreatingProject = null;
        },
        clearUpdateProject: (state) => {
            state.isProjectUpdated = false;
            state.loadingUpdatingProject = false;
            state.errorUpdatingProject = null;
        },
        clearDeleteProject: (state) => {
            state.isProjectDeleted = false;
            state.loadingDeletingProject = false;
            state.errorDeletingProject = null;
        },
        clearCreateProjectDetail: (state) => {
            state.isProjectDetailCreated = false;
            state.loadingCreatingProjectDetail = false;
            state.errorCreatingProjectDetail = null;
        },
        clearDeleteProjectDetail: (state) => {
            state.isProjectDetailDeleted = false;
            state.loadingDeletingProjectDetail = false;
            state.errorDeletingProjectDetail = null;
        }
    },
    extraReducers: (builder) => {
        // Get Projects
        builder
            .addCase(getProjects.pending, (state) => {
                state.loadingProjects = true;
                state.errorProjects = null;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.loadingProjects = false;
                state.projects = action.payload.data;
                state.totalPages = action.payload.pagination.total_pages;
                state.totalRecords = action.payload.pagination.total_records;
                state.itemsPerPage = action.payload.pagination.limit;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.loadingProjects = false;
                state.errorProjects = action.payload || "Failed to fetch projects";
            })
            // Get Project By Id
            .addCase(getProjectById.pending, (state) => {
                state.loadingCurrentProject = true;
                state.errorCurrentProject = null;
            })
            .addCase(getProjectById.fulfilled, (state, action) => {
                state.loadingCurrentProject = false;
                state.currentProject = action.payload;
            })
            .addCase(getProjectById.rejected, (state, action) => {
                state.loadingCurrentProject = false;
                state.errorCurrentProject = action.payload || "Failed to fetch project";
            })
            // Create Project
            .addCase(createProject.pending, (state) => {
                state.loadingCreatingProject = true;
                state.errorCreatingProject = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.loadingCreatingProject = false;
                state.isProjectCreated = true;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loadingCreatingProject = false;
                state.errorCreatingProject = action.payload || "Failed to create project";
            })
            // Update Project
            .addCase(updateProject.pending, (state) => {
                state.loadingUpdatingProject = true;
                state.errorUpdatingProject = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loadingUpdatingProject = false;
                state.isProjectUpdated = true;
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loadingUpdatingProject = false;
                state.errorUpdatingProject = action.payload || "Failed to update project";
            })
            // Delete Project
            .addCase(deleteProject.pending, (state) => {
                state.loadingDeletingProject = true;
                state.errorDeletingProject = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.loadingDeletingProject = false;
                state.isProjectDeleted = true;
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.loadingDeletingProject = false;
                state.errorDeletingProject = action.payload || "Failed to delete project";
            })
            // Create Project Detail
            .addCase(createProjectDetail.pending, (state) => {
                state.loadingCreatingProjectDetail = true;
                state.errorCreatingProjectDetail = null;
            })
            .addCase(createProjectDetail.fulfilled, (state, action) => {
                state.loadingCreatingProjectDetail = false;
                state.isProjectDetailCreated = true;
            })
            .addCase(createProjectDetail.rejected, (state, action) => {
                state.loadingCreatingProjectDetail = false;
                state.errorCreatingProjectDetail = action.payload || "Failed to create project detail";
            })
            // Delete Project Detail
            .addCase(deleteProjectDetail.pending, (state) => {
                state.loadingDeletingProjectDetail = true;
                state.errorDeletingProjectDetail = null;
            })
            .addCase(deleteProjectDetail.fulfilled, (state, action) => {
                state.loadingDeletingProjectDetail = false;
                state.isProjectDetailDeleted = true;
            })
            .addCase(deleteProjectDetail.rejected, (state, action) => {
                state.loadingDeletingProjectDetail = false;
                state.errorDeletingProjectDetail = action.payload || "Failed to delete project detail";
            });
    }
});

export const {
    clearCurrentProject,
    clearCreateProject,
    clearUpdateProject,
    clearDeleteProject,
    clearCreateProjectDetail,
    clearDeleteProjectDetail
} = projectSlice.actions;
export default projectSlice.reducer;