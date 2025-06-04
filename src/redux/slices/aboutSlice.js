import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';

export const getAbout = createAsyncThunk(
    "about/getAbout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/about-us/get.php`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

export const createAbout = createAsyncThunk(
    "about/createAbout",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/about-us/create.php`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error create data"));
        }
    }
);

export const updateAbout = createAsyncThunk(
    "about/updateAbout",
    async ({  data }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/about-us/update.php`, data,{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error update data"));
        }
    }
);

export const updateAboutImage = createAsyncThunk(
    "about/updateAboutImage",
    async ({ image }, { rejectWithValue }) => {
        try {
            const response = await request.post(`/modular/about-us/update-image.php`, image,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error update image data"));
        }
    }
);


const aboutSlice = createSlice({
    name: "about",
    initialState: {
        aboutUs: null,
        loading: false,
        error: null,
        isAboutCreated: false,
        loadingCreatingAbout: false,
        errorCreatingAbout: null,
        isAboutUpdated: false,
        loadingUpdatingAbout: false,
        errorUpdatingAbout: null,
        isImageChange : false,
        loadingChaningImage: false,
        errorChangingImage: null
    },
    reducers: {
        clearCreateAboutUs: (state) => {
            state.isAboutCreated = false;
        },
        clearUpdateAboutUs: (state) => {
            state.isAboutUpdated = false;
        },
        clearChangeImageAboutUs: (state) => {
            state.isImageChange = false;
        }
    },
    extraReducers: (builder) => {
        // fetch about us
        builder
            .addCase(getAbout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAbout.fulfilled, (state, action) => {
                state.loading = false;
                state.aboutUs = action.payload;
            })
            .addCase(getAbout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch about us";
            });
        // create about
        builder
            .addCase(createAbout.pending, (state) => {
                state.loadingCreatingAbout = true;
                state.errorCreatingAbout = null;
            })
            .addCase(createAbout.fulfilled, (state) => {
                state.loadingCreatingAbout = false;
                state.isAboutCreated = true;
            })
            .addCase(createAbout.rejected, (state, action) => {
                state.loadingCreatingAbout = false;
                state.errorCreatingAbout = action.payload || "Failed to create about us";
            });
        // update about
        builder
            .addCase(updateAbout.pending, (state) => {
                state.loadingUpdatingAbout = true;
                state.errorUpdatingAbout = null;
            })
            .addCase(updateAbout.fulfilled, (state) => {
                state.loadingUpdatingAbout = false;
                state.isAboutUpdated = true;
            })
            .addCase(updateAbout.rejected, (state, action) => {
                state.loadingUpdatingAbout = false;
                state.errorUpdatingAbout = action.payload || "Failed to update about us";
            });
        // update image about
        builder
            .addCase(updateAboutImage.pending, (state) => {
                state.loadingChaningImage = true;
                state.errorChangingImage = null;
            })
            .addCase(updateAboutImage.fulfilled, (state) => {
                state.loadingChaningImage = false;
                state.isImageChange = true;
            })
            .addCase(updateAboutImage.rejected, (state, action) => {
                state.loadingChaningImage = false;
                state.errorChangingImage = action.payload || "Failed to update image about us";
            });
    }
});

export const {
    clearCreateAboutUs,
    clearChangeImageAboutUs,
    clearUpdateAboutUs
} = aboutSlice.actions;
export default aboutSlice.reducer;