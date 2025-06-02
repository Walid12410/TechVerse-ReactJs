import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { toast } from 'react-toastify';

export const getProjectView = createAsyncThunk(
    "projectView/fetchProjectView",
    async ({page, limit}, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/project-view/get.php?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

export const createProjectView = createAsyncThunk(
    "projectView/createProjectView",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/project-view/create.php`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.error || "Error create data");
            return rejectWithValue((error.response?.data?.error || "Error create data"));
        }
    }
);

export const updateProjectView = createAsyncThunk(
    "projectView/updateProjectView",
    async ({id, data }, { rejectWithValue }) => {
        try {
            const response = await request.put(`/modular/project-view/update.php?id=${id}`, data, {
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

export const updateProjectViewImage = createAsyncThunk(
    "projectView/updateProjectViewImage",
    async ({id, image }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/project-view/update-image.php?id=${id}`, image, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error create data");
            return rejectWithValue((error.response?.data?.message || "Error create data"));
        }
    }
);

export const deleteProjectView = createAsyncThunk(
    "projectView/deleteProjectView",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/project-view/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.error || "Error create data");
            return rejectWithValue((error.response?.data?.error || "Error create data"));
        }
    }
);

const projectViewSlice = createSlice({
    name: "projectView",
    initialState: {
        projectViews: [],
        loadingProjectViews: false,
        errorProjectViews: null,
        totalPages: 0,
        totalRecords: 0,
        itemsPerPage: 10,
        isProjectViewCreated: false,
        loadingCreatingProjectView: false,
        errorCreatingProjectView: null,
        isProjectViewUpdated: false,
        loadingUpdatingProjectView: false,
        errorUpdatingProjectView: null,
        isProjectViewImageUpdated: false,
        loadingUpdatingProjectViewImage: false,
        errorUpdatingProjectViewImage: null,
        isProjectViewDeleted: false,
        loadingDeletingProjectView: false,
        errorDeletingProjectView: null,
    },
    reducers: {
        clearCreateProjectView: (state) => {
            state.errorCreatingProjectView = null;
            state.loadingCreatingProjectView = false;
            state.isProjectViewCreated = false;
        },
        clearUpdateProjectView: (state) => {
            state.errorUpdatingProjectView = null;
            state.loadingUpdatingProjectView = false;
            state.isProjectViewUpdated = false;
        },
        clearUpdateProjectViewImage: (state) => {
            state.errorUpdatingProjectViewImage = null;
            state.loadingUpdatingProjectViewImage = false;
            state.isProjectViewImageUpdated = false;
        },
        clearDeleteProjectView: (state) => {
            state.errorDeletingProjectView = null;
            state.loadingDeletingProjectView = false;
            state.isProjectViewDeleted = false;
        }
    },
    extraReducers: (builder) => {
        // Get Project Views
        builder
            .addCase(getProjectView.pending, (state) => {
                state.loadingProjectViews = true;
                state.errorProjectViews = null;
            })
            .addCase(getProjectView.fulfilled, (state, action) => {
                state.loadingProjectViews = false;
                state.projectViews = action.payload.data;
                state.totalPages = action.payload.pagination.total_pages;
                state.totalRecords = action.payload.pagination.total_records;
                state.itemsPerPage = action.payload.pagination.limit;
            })
            .addCase(getProjectView.rejected, (state, action) => {
                state.loadingProjectViews = false;
                state.errorProjectViews = action.payload || "Failed to fetch project views";
            });

        // Create Project View
        builder
            .addCase(createProjectView.pending, (state) => {
                state.loadingCreatingProjectView = true;
                state.errorCreatingProjectView = null;
            })
            .addCase(createProjectView.fulfilled, (state, action) => {
                state.loadingCreatingProjectView = false;
                state.isProjectViewCreated = true;
            })
            .addCase(createProjectView.rejected, (state, action) => {
                state.loadingCreatingProjectView = false;
                state.errorCreatingProjectView = action.payload || "Failed to create project view";
            });

        // Update Project View
        builder
            .addCase(updateProjectView.pending, (state) => {
                state.loadingUpdatingProjectView = true;
                state.errorUpdatingProjectView = null;
            })
            .addCase(updateProjectView.fulfilled, (state, action) => {
                state.loadingUpdatingProjectView = false;
                state.isProjectViewUpdated = true;
            })
            .addCase(updateProjectView.rejected, (state, action) => {
                state.loadingUpdatingProjectView = false;
                state.errorUpdatingProjectView = action.payload || "Failed to update project view";
            });

        // Update Project View Image
        builder
            .addCase(updateProjectViewImage.pending, (state) => {
                state.loadingUpdatingProjectViewImage = true;
                state.errorUpdatingProjectViewImage = null;
            })
            .addCase(updateProjectViewImage.fulfilled, (state, action) => {
                state.loadingUpdatingProjectViewImage = false;
                state.isProjectViewImageUpdated = true;
            })
            .addCase(updateProjectViewImage.rejected, (state, action) => {
                state.loadingUpdatingProjectViewImage = false;
                state.errorUpdatingProjectViewImage = action.payload || "Failed to update project view image";
            });

        // Delete Project View
        builder
            .addCase(deleteProjectView.pending, (state) => {
                state.loadingDeletingProjectView = true;
                state.errorDeletingProjectView = null;
            })
            .addCase(deleteProjectView.fulfilled, (state, action) => {
                state.loadingDeletingProjectView = false;
                state.isProjectViewDeleted = true;
            })
            .addCase(deleteProjectView.rejected, (state, action) => {
                state.loadingDeletingProjectView = false;
                state.errorDeletingProjectView = action.payload || "Failed to delete project view";
            });
    }
});

export const {
    clearCreateProjectView,
    clearUpdateProjectView,
    clearUpdateProjectViewImage,
    clearDeleteProjectView
} = projectViewSlice.actions;

export default projectViewSlice.reducer;