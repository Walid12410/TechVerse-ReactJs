import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';

export const getSettings = createAsyncThunk(
    "setting/fetchSetting",
    async (_, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/setting/get.php`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

export const updateSetting = createAsyncThunk(
    "setting/updateSetting",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await request.put(`/modular/setting/update.php`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error update data"));
        }
    }
);
const settingSlice = createSlice({
    name: "setting",
    initialState: {
        settings: [],
        loadingSetting: false,
        errorSetting: null,
        isSettingUpdated: false,
        loadingSettingUpdate: false,
        errorUpdateSetting: null
    },
    reducers: {
        clearUpdateSetting: (state) => {
            state.errorUpdateSetting = null;
            state.loadingSettingUpdate = false;
            state.isSettingUpdated = false;
        }
    },
    extraReducers: (builder) => {
        // fetch setting
        builder
            .addCase(getSettings.pending, (state) => {
                state.loadingSetting = true;
                state.errorSetting = null;
            })
            .addCase(getSettings.fulfilled, (state, action) => {
                state.loadingSetting = false;
                state.settings = action.payload;
            })
            .addCase(getSettings.rejected, (state, action) => {
                state.loadingSetting = false;
                state.errorSetting = action.payload || "Failed to fetch setting";
            });
        // fetch setting
        builder
            .addCase(updateSetting.pending, (state) => {
                state.loadingSettingUpdate = true;
                state.errorUpdateSetting = null;
            })
            .addCase(updateSetting.fulfilled, (state, action) => {
                state.loadingSettingUpdate = false;
                state.isSettingUpdated = true;
            })
            .addCase(updateSetting.rejected, (state, action) => {
                state.loadingSettingUpdate = false;
                state.errorUpdateSetting = action.payload || "Failed to update setting";
            });

    }
});

export const {clearUpdateSetting} = settingSlice.actions;
export default settingSlice.reducer;