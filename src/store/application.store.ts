import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Page} from "../config/constants";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        currentPage: Page.GAME,
    },
    reducers: {
        setCurrentPage(state, action: PayloadAction<Page>) {
            state.currentPage = action.payload
        },
    },
})

export const {
    setCurrentPage
} = applicationSlice.actions

export default applicationSlice.reducer
