import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request';

export const getStatus = createAsyncThunk(
    "dashboard/getStatus",
    async (_, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/dashboard/stats.php`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);


export const getSummaryMember = createAsyncThunk(
    "dashboard/getSummaryMember",
    async (_, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/dashboard/summary.php?type=members`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

export const getSummaryClient = createAsyncThunk(
    "dashboard/getSummaryClient",
    async (_, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/dashboard/summary.php?type=clients`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

export const getSummaryMessage = createAsyncThunk(
    "dashboard/getSummaryMessage",
    async (_, { rejectWithValue }) => {
        try {
            const response = await request.get(`/modular/dashboard/summary.php?type=messages`);
            return response.data;
        } catch (error) {
            return rejectWithValue((error.response?.data?.error || "Error fetch data"));
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        // Status states
        status: null,
        loadingStatus: false,
        errorStatus: null,

        // Member Summary states
        memberSummary: null,
        loadingMemberSummary: false,
        errorMemberSummary: null,

        // Client Summary states
        clientSummary: null,
        loadingClientSummary: false,
        errorClientSummary: null,

        // Message Summary states
        messageSummary: null,
        loadingMessageSummary: false,
        errorMessageSummary: null,
    },
    reducers: {
        clearStatus: (state) => {
            state.status = null;
            state.loadingStatus = false;
            state.errorStatus = null;
        },
        clearProjectSummary: (state) => {
            state.projectSummary = null;
            state.loadingProjectSummary = false;
            state.errorProjectSummary = null;
        },
        clearMemberSummary: (state) => {
            state.memberSummary = null;
            state.loadingMemberSummary = false;
            state.errorMemberSummary = null;
        },
        clearClientSummary: (state) => {
            state.clientSummary = null;
            state.loadingClientSummary = false;
            state.errorClientSummary = null;
        },
        clearMessageSummary: (state) => {
            state.messageSummary = null;
            state.loadingMessageSummary = false;
            state.errorMessageSummary = null;
        }
    },
    extraReducers: (builder) => {
        // Get Status
        builder
            .addCase(getStatus.pending, (state) => {
                state.loadingStatus = true;
                state.errorStatus = null;
            })
            .addCase(getStatus.fulfilled, (state, action) => {
                state.loadingStatus = false;
                state.status = action.payload;
            })
            .addCase(getStatus.rejected, (state, action) => {
                state.loadingStatus = false;
                state.errorStatus = action.payload || "Failed to fetch status";
            })
            // Get Member Summary
            .addCase(getSummaryMember.pending, (state) => {
                state.loadingMemberSummary = true;
                state.errorMemberSummary = null;
            })
            .addCase(getSummaryMember.fulfilled, (state, action) => {
                state.loadingMemberSummary = false;
                state.memberSummary = action.payload.data;
            })
            .addCase(getSummaryMember.rejected, (state, action) => {
                state.loadingMemberSummary = false;
                state.errorMemberSummary = action.payload || "Failed to fetch member summary";
            })
            // Get Client Summary
            .addCase(getSummaryClient.pending, (state) => {
                state.loadingClientSummary = true;
                state.errorClientSummary = null;
            })
            .addCase(getSummaryClient.fulfilled, (state, action) => {
                state.loadingClientSummary = false;
                state.clientSummary = action.payload.data;
            })
            .addCase(getSummaryClient.rejected, (state, action) => {
                state.loadingClientSummary = false;
                state.errorClientSummary = action.payload || "Failed to fetch client summary";
            })
            // Get Message Summary
            .addCase(getSummaryMessage.pending, (state) => {
                state.loadingMessageSummary = true;
                state.errorMessageSummary = null;
            })
            .addCase(getSummaryMessage.fulfilled, (state, action) => {
                state.loadingMessageSummary = false;
                state.messageSummary = action.payload.data;
            })
            .addCase(getSummaryMessage.rejected, (state, action) => {
                state.loadingMessageSummary = false;
                state.errorMessageSummary = action.payload || "Failed to fetch message summary";
            });
    }
});

export const {
    clearStatus,
    clearProjectSummary,
    clearMemberSummary,
    clearClientSummary,
    clearMessageSummary
} = dashboardSlice.actions;
export default dashboardSlice.reducer;