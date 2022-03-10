import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
    currentUser:"",
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


export const inAndOutSlice = createSlice({
    name: 'Log in and out',
    initialState,
    reducers:{ //non-async reducers
        
        login: (state) => {
            state.isLogin = true
        },
        logout: (state) => {
            state.isLogin = false
        },
        handleIdInput:(state, action)=>{
            state.idInput = action.payload
        },
        handlePwdInput:(state, action)=>{
            state.pwdInput = action.payload
        },
    },
    extraReducers: { // async reducers 
        // [testing.fulfilled]: (state, action) => {
        //     return [...action.payload];
        //   }
      }
})

export const {login, logout} = inAndOutSlice.actions
export default inAndOutSlice.reducer

