import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Page} from "../config/constants";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        currentPage: Page.LOGIN,
        isLoading: false,
        nickname: '',
    },
    reducers: {
        setCurrentPage(state, action: PayloadAction<Page>) {
            state.currentPage = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setNickname(state, action: PayloadAction<string>) {
            state.nickname = action.payload
        },
    },
})

export const {
    setCurrentPage,
    setLoading,
    setNickname
} = applicationSlice.actions

export default applicationSlice.reducer
