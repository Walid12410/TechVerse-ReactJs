import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';

export const getServices = createAsyncThunk(
    "service/fetchService",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/service/get.php?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

export const getServicesFeature = createAsyncThunk(
    "service/fetchServicesFeature",
    async (_, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/service-feature/get.php`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);


export const createServiceFeature = createAsyncThunk(
    "service/createServiceFeature",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/service-feature/create.php`,data);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error create data"));
        }
    }
);



export const deleteServiceFeature = createAsyncThunk(
    "service/deleteServiceFeature",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/service-feature/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error update data"));
        }
    }
);


export const createService = createAsyncThunk(
    "service/createService",
    async ({ serviceData }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/service/create.php`, serviceData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);


export const createServiceDetails = createAsyncThunk(
    "service/createServiceDetails",
    async ({ serviceDetailsData }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/service-details/create.php`, serviceDetailsData);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);


export const deleteServiceDetail = createAsyncThunk(
    "service/deleteServiceDetails",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/service-details/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error deleting data"));
        }
    }
);



export const changeServiceImage = createAsyncThunk(
    "service/changeServiceImage",
    async ({ id, formDataImage }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/service/update-image.php?id=${id}`, formDataImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error changing image"));
        }
    }
);


export const updateService = createAsyncThunk(
    "service/updateService",
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            const response = await request.post(
                `/modular/service/update.php?id=${id}`,
                updateData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            return response.data; // ✅ only return the data, not the full Axios response
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error update data"));
        }
    }
);



export const deleteService = createAsyncThunk(
    "service/deleteService",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/service/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error deleting data"));
        }
    }
);




const serviceSlice = createSlice({
    name: "service",
    initialState: {
        services: [],
        loadingServices: false,
        errorServices: null,
        totalPages: 0,  // Total number of pages (this will be returned from API)
        totalRecords: 0, // Total number of records (this will be returned from API)
        itemsPerPage: 10, // Define items per page
        isCreated: false,
        loadingCreating: false,
        errorCreating: null,
        isServiceDetailCreated: false,
        loadingCreatedServiceDetail: false,
        errorCreatingServiceDetail: null,
        isServiceDetailDeleting: false,
        loadingDeletingServiceDetail: false,
        errorDeleteServiceDetail: null,
        isServiceUpdating: false,
        loadingUpdatingService: false,
        errorUpdateService: null,
        isServiceImageChanging: false,
        loadingChangingServiceImage: false,
        errorChangingServiceImage: null,
        isServiceDeleted: false,
        loadingDeleteService: false,
        errorDeletingService: null,
        serviceFeature: [],
        loadingServiceFeature: false,
        errorServiceFeature: null,
        isFeatureCreate: false,
        loadingFeatureCreate: false,
        errorFeatureCreate: null,
        isFeatureDelete: false,
        loadingFeatureDelete: false,
        errorFeatureDelete: null
    },
    reducers: {
        clearCreatingService: (state) => {
            state.isCreated = false;
            state.loadingCreating = false;
            state.errorCreating = null;
        },
        clearCreatingServiceDetails: (state) => {
            state.isServiceDetailCreated = false;
            state.loadingCreatedServiceDetail = false;
            state.errorCreatingServiceDetail = null;
        },
        clearDeleteServiceDetails: (state) => {
            state.isServiceDetailDeleting = false;
            state.loadingDeletingServiceDetail = false;
            state.errorDeleteServiceDetail = null;
        },
        clearUpdateService: (state) => {
            state.isServiceUpdating = false;
            state.loadingUpdatingService = false;
            state.errorUpdateService = null;
        },
        clearChangingServiceImage: (state) => {
            state.isServiceImageChanging = false;
            state.loadingChangingServiceImage = false;
            state.errorChangingServiceImage = null;
        },
        clearServiceDelete: (state) => {
            state.isServiceDeleted = false;
            state.loadingDeleteService = false;
            state.errorDeletingService = null;
        },
        clearFeatureCreate: (state) => {
            state.isFeatureCreate = false;
            state.loadingFeatureCreate = false;
            state.errorFeatureCreate = null;
        },
        clearFeatureDelete: (state) => {
            state.isFeatureDelete = false;
            state.loadingFeatureDelete = false;
            state.errorFeatureDelete = null;
        }
    },
    extraReducers: (builder) => {
        // fetch service
        builder
            .addCase(getServices.pending, (state) => {
                state.loadingServices = true;
                state.errorServices = null;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.loadingServices = false;
                state.services = action.payload.data; // Update services list
                state.totalPages = action.payload.pagination.total_pages; // Total pages
                state.totalRecords = action.payload.pagination.total_records; // Total records
            })
            .addCase(getServices.rejected, (state, action) => {
                state.loadingServices = false;
                state.errorServices = action.payload || "Failed to fetch services";
            });
        // fetch service feature
        builder
            .addCase(getServicesFeature.pending, (state) => {
                state.loadingServiceFeature = true;
                state.errorServiceFeature = null;
            })
            .addCase(getServicesFeature.fulfilled, (state, action) => {
                state.loadingServiceFeature = false;
                state.serviceFeature = action.payload; 
            })
            .addCase(getServicesFeature.rejected, (state, action) => {
                state.loadingServiceFeature = false;
                state.errorServiceFeature = action.payload || "Failed to fetch services feature";
            });
        // create service feature
        builder
            .addCase(createServiceFeature.pending, (state) => {
                state.loadingFeatureCreate = true;
                state.errorFeatureCreate = null;
            })
            .addCase(createServiceFeature.fulfilled, (state) => {
                state.loadingFeatureCreate = false;
                state.isFeatureCreate = true;
            })
            .addCase(createServiceFeature.rejected, (state, action) => {
                state.loadingFeatureCreate = false;
                state.errorFeatureCreate = action.payload || "Failed to create services feature";
            });
        // delete service feature
        builder
            .addCase(deleteServiceFeature.pending, (state) => {
                state.loadingFeatureDelete = true;
                state.errorFeatureDelete = null;
            })
            .addCase(deleteServiceFeature.fulfilled, (state) => {
                state.loadingFeatureDelete = false;
                state.isFeatureDelete = true;
            })
            .addCase(deleteServiceFeature.rejected, (state, action) => {
                state.loadingFeatureDelete = false;
                state.errorFeatureDelete = action.payload || "Failed to create services feature";
            });
        // create service
        builder
            .addCase(createService.pending, (state) => {
                state.loadingCreating = true;
                state.errorCreating = null;
            })
            .addCase(createService.fulfilled, (state) => {
                state.loadingCreating = false;
                state.isCreated = true;
            })
            .addCase(createService.rejected, (state, action) => {
                state.loadingCreating = false;
                state.errorCreating = action.payload || "Failed to create services";
            });
        // create service details
        builder
            .addCase(createServiceDetails.pending, (state) => {
                state.loadingCreatedServiceDetail = true;
                state.errorCreatingServiceDetail = null;
            })
            .addCase(createServiceDetails.fulfilled, (state) => {
                state.loadingCreatedServiceDetail = false;
                state.isServiceDetailCreated = true;
            })
            .addCase(createServiceDetails.rejected, (state, action) => {
                state.loadingCreatedServiceDetail = false;
                state.errorCreatingServiceDetail = action.payload || "Failed to create service details";
            });
        // delete service details
        builder
            .addCase(deleteServiceDetail.pending, (state) => {
                state.loadingDeletingServiceDetail = true;
                state.errorDeleteServiceDetail = null;
            })
            .addCase(deleteServiceDetail.fulfilled, (state) => {
                state.loadingDeletingServiceDetail = false;
                state.isServiceDetailDeleting = true;
            })
            .addCase(deleteServiceDetail.rejected, (state, action) => {
                state.loadingDeletingServiceDetail = false;
                state.errorDeleteServiceDetail = action.payload || "Failed to delete service details";
            });
        // update service
        builder
            .addCase(updateService.pending, (state) => {
                state.loadingUpdatingService = true;
                state.errorUpdateService = null;
            })
            .addCase(updateService.fulfilled, (state) => {
                state.loadingUpdatingService = false;
                state.isServiceUpdating = true;
            })
            .addCase(updateService.rejected, (state, action) => {
                state.loadingUpdatingService = false;
                state.errorUpdateService = action.payload || "Failed to update service";
            });
        // change service image
        builder
            .addCase(changeServiceImage.pending, (state) => {
                state.loadingChangingServiceImage = true;
                state.errorChangingServiceImage = null;
            })
            .addCase(changeServiceImage.fulfilled, (state) => {
                state.loadingChangingServiceImage = false;
                state.isServiceImageChanging = true;
            })
            .addCase(changeServiceImage.rejected, (state, action) => {
                state.loadingChangingServiceImage = false;
                state.errorChangingServiceImage = action.payload || "Failed to change service image";
            });
        // delete service
        builder
            .addCase(deleteService.pending, (state) => {
                state.loadingDeleteService = true;
                state.errorDeletingService = null;
            })
            .addCase(deleteService.fulfilled, (state) => {
                state.loadingDeleteService = false;
                state.isServiceDeleted = true;
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.loadingDeleteService = false;
                state.errorDeletingService = action.payload || "Failed to delete service";
            });
    }
});

export const {
    clearCreatingService,
    clearCreatingServiceDetails,
    clearDeleteServiceDetails,
    clearUpdateService,
    clearChangingServiceImage,
    clearServiceDelete,
    clearFeatureCreate,
    clearFeatureDelete,
} = serviceSlice.actions;
export default serviceSlice.reducer;