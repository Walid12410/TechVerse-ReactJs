import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';
import { toast } from 'react-toastify';

export const getPricing = createAsyncThunk(
    "pricing/fetchPricing",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/pricing/get.php?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.message || "Error fetch data"));
        }
    }
);

export const updatePricing = createAsyncThunk(
    "pricing/updatePricing",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await request.put(`/modular/pricing/update.php?id=${id}`, data);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error update data");
            return rejectWithValue((error.response?.data?.message || "Error update data"));
        }
    }
);

export const createPricing = createAsyncThunk(
    "pricing/createPricing",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/pricing/create.php`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error create data");
            return rejectWithValue((error.response?.data?.message || "Error create data"));
        }
    }
);

export const createPricingDetails = createAsyncThunk(
    "pricing/createPricingDetails",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/pricing-details/create.php`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error create data");
            return rejectWithValue((error.response?.data?.message || "Error create data"));
        }
    }
);


export const deletePricingDetails = createAsyncThunk(
    "pricing/deletePricingDetails",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/pricing-details/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error delete data");
            return rejectWithValue((error.response?.data?.message || "Error delete data"));
        }
    }
);

export const deletePrice = createAsyncThunk(
    "pricing/deletePrice",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await request.delete(`/modular/pricing/delete.php?id=${id}`);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error delete data");
            return rejectWithValue((error.response?.data?.message || "Error delete data"));
        }
    }
);

const priceSlice = createSlice({
    name: "pricing",
    initialState: {
        pricing: [],
        loadingPricing: false,
        errorPricing: null,
        totalPages: 0,
        totalRecords: 0,
        itemsPerPage: 10,
        isPricingCreated: false,
        loadingCreatingPricing: false,
        errorCreatingPricing: null,
        isPricingUpdated: false,
        loadingPricingUpdate: false,
        errorUpdatePricing: null,
        isPricingDetailsCreated: false,
        loadingCreatingPricingDetails: false,
        errorCreatingPricingDetails: null,
        isPricingDetailsDeleted: false,
        loadingDeletingPricingDetails: false,
        errorDeletingPricingDetails: null,
        isPriceDeleted: false,
        loadingDeletingPrice: false,
        errorDeletingPrice: null,
    },
    reducers: {
        clearUpdatePricing: (state) => {
            state.errorUpdatePricing = null;
            state.loadingPricingUpdate = false;
            state.isPricingUpdated = false;
        },
        clearCreatePricingDetails: (state) => {
            state.errorCreatingPricingDetails = null;
            state.loadingCreatingPricingDetails = false;
            state.isPricingDetailsCreated = false;
        },
        clearDeletePricingDetails: (state) => {
            state.errorDeletingPricingDetails = null;
            state.loadingDeletingPricingDetails = false;
            state.isPricingDetailsDeleted = false;
        },
        clearDeletePrice: (state) => {
            state.errorDeletingPrice = null;
            state.loadingDeletingPrice = false;
            state.isPriceDeleted = false;
        },
        clearCreatePrice: (state) => {
            state.isPricingCreated = false;
            state.loadingCreatingPricing = false;
            state.errorCreatingPricing = null;
        }
    },
    extraReducers: (builder) => {
        // fetch setting
        builder
            .addCase(getPricing.pending, (state) => {
                state.loadingPricing = true;
                state.errorPricing = null;
            })
            .addCase(getPricing.fulfilled, (state, action) => {
                state.loadingPricing = false;
                state.pricing = action.payload.data;
                state.totalPages = action.payload.pagination.total_pages;
                state.totalRecords = action.payload.pagination.total_records;
                state.itemsPerPage = action.payload.pagination.limit;
            })
            .addCase(getPricing.rejected, (state, action) => {
                state.loadingPricing = false;
                state.errorPricing = action.payload || "Failed to fetch pricing";
            });
        // fetch setting
        builder
            .addCase(updatePricing.pending, (state) => {
                state.loadingPricingUpdate = true;
                state.errorUpdatePricing = null;
            })
            .addCase(updatePricing.fulfilled, (state, action) => {
                state.loadingPricingUpdate = false;
                state.isPricingUpdated = true;
            })
            .addCase(updatePricing.rejected, (state, action) => {
                state.loadingPricingUpdate = false;
                state.errorUpdatePricing = action.payload || "Failed to update pricing";
            });
        // create pricing
        builder
            .addCase(createPricing.pending, (state) => {
                state.loadingCreatingPricing = true;
                state.errorCreatingPricing = null;
            })
            .addCase(createPricing.fulfilled, (state, action) => {
                state.loadingCreatingPricing = false;
                state.isPricingCreated = true;
            })
            .addCase(createPricing.rejected, (state, action) => {
                state.loadingCreatingPricing = false;
                state.errorCreatingPricing = action.payload || "Failed to create pricing";
            });
        // create pricing details
        builder
            .addCase(createPricingDetails.pending, (state) => {
                state.loadingCreatingPricingDetails = true;
                state.errorCreatingPricingDetails = null;
            })
            .addCase(createPricingDetails.fulfilled, (state, action) => {
                state.loadingCreatingPricingDetails = false;
                state.isPricingDetailsCreated = true;
            })
            .addCase(createPricingDetails.rejected, (state, action) => {
                state.loadingCreatingPricingDetails = false;
                state.errorCreatingPricingDetails = action.payload || "Failed to create pricing details";
            });
        // delete pricing details
        builder
            .addCase(deletePricingDetails.pending, (state) => {
                state.loadingDeletingPricingDetails = true;
                state.errorDeletingPricingDetails = null;
            })
            .addCase(deletePricingDetails.fulfilled, (state, action) => {
                state.loadingDeletingPricingDetails = false;
                state.isPricingDetailsDeleted = true;
            })
            .addCase(deletePricingDetails.rejected, (state, action) => {
                state.loadingDeletingPricingDetails = false;
                state.errorDeletingPricingDetails = action.payload || "Failed to delete pricing details";
            });
        // delete price
        builder
            .addCase(deletePrice.pending, (state) => {
                state.loadingDeletingPrice = true;
                state.errorDeletingPrice = null;
            })
            .addCase(deletePrice.fulfilled, (state, action) => {
                state.loadingDeletingPrice = false;
                state.isPriceDeleted = true;
            })
            .addCase(deletePrice.rejected, (state, action) => {
                state.loadingDeletingPrice = false;
                state.errorDeletingPrice = action.payload || "Failed to delete price";
            });
    }
});

export const { 
    clearUpdatePricing,
    clearCreatePricingDetails,
    clearDeletePricingDetails,
    clearDeletePrice,
    clearCreatePrice
} = priceSlice.actions;
export default priceSlice.reducer;