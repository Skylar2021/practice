import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
    self_review: {},
    top_down_review: {},
    supervisor: false,
    questionsBank: [],
    answers: []
    // currentUser:"",
    // pwd: "",
    // id: ""
}

// export const testing = createAsyncThunk(
//     'staff info', 
//     async () =>{
//         let res = await fetch("http://localhost:8080/")
//         if(res.ok){
//             return res.json()
//         }
//     }

// )


export const staffInfo = createSlice({
    name: 'Log in and out',
    initialState,
    reducers: { //non-async reducers

        login: (state) => {
            state.isLogin = true
        },
        logout: (state) => {
            state.isLogin = false
        },
        selfReview: (state, action) => {
            state.self_review = action.payload
        },
        tdReview: (state, action) => {
            state.top_down_review = action.payload
        },
        getQuestions: (state, action) => {
            state.questionsBank = action.payload
        },
        toggleSupervisor: (state, action) => {
            state.supervisor = action.payload

        },
        getAnswers: (state, action) => {
            state.answers = action.payload
        }
       
    },
    extraReducers: { // async reducers 
        // [testing.fulfilled]: (state, action) => {
        //     return [...action.payload];
        //   }
    }
})

export const { login, logout, selfReview, tdReview, getQuestions, toggleSupervisor, getAnswers } = staffInfo.actions
export default staffInfo.reducer

