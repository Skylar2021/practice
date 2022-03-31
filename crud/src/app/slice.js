import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
    self_review: {},
    top_down_review: {},
    supervisor: false,
    questionsBank: [],
    answers: [],
    score: {},
    user: {}

    // currentUser:"",
    // pwd: "",
    // id: ""
}

export const testing = createAsyncThunk(
    'staff info',
    async () => {
        try {

            let res = await fetch("http://localhost:8080/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "id": `1-2878`, "password": `0000` }),
                    credentials: 'include'
                })
            let result = res.json()
            console.log(result)
            return result

        } catch (error) {
            return error

        }

    }

)

export const selfReviewData = createAsyncThunk(
    'self reivew detail',
    async (staff_id) => {
        try {
            let res = await fetch("http://localhost:8080/review/get_self_review_summary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "id": `${staff_id}` }),
                credentials: 'include'
            })
            if (res.ok) {
                let result = await res.json()
                console.log(result)
                return result
            }
        } catch (error) {
            return error
        }
    }
)


export const staffInfo = createSlice({
    name: 'Appraisal',
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
        },
        getScore: (state, action) => {
            state.score = action.payload
        },
        setSelfReviewStatus: (state, action) => {
            state.self_review.status = action.payload
        }

    },
    extraReducers: { // async reducers 
        [testing.fulfilled]: (state, { payload }) => {
            state.user = payload
        },
        [selfReviewData.fulfilled]: (state, { payload }) => {
            state.self_review = payload
        }
    }
})

export const { login, logout, selfReview, tdReview, getQuestions, toggleSupervisor, getAnswers, getScore, setSelfReviewStatus } = staffInfo.actions
export default staffInfo.reducer

