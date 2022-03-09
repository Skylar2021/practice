import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
    value: 0

}

export const testing = createAsyncThunk(
    'staff info', 
    async () =>{
        let res = await fetch("http://localhost:8080/")
        if(res.ok){
            return res.json()
        }
    }
    
)


export const staffSlice = createSlice({
    name: 'staff info',
    initialState,
    reducers:{ //non-async reducers
        
        login: (state) => {
            state.isLogin = true
        },
        logout: (state) => {
            state.isLogin = false
        }
    },
    extraReducers: { // async reducers 
        [testing.fulfilled]: (state, action) => {
            return [...action.payload];
          }
      }
})

export const {login, logout} = staffSlice.actions
export default staffSlice.reducer


// export const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//       increment: (state) => {
//         // Redux Toolkit allows us to write "mutating" logic in reducers. It
//         // doesn't actually mutate the state because it uses the Immer library,
//         // which detects changes to a "draft state" and produces a brand new
//         // immutable state based off those changes
//         state.value += 1
//       },
//       decrement: (state) => {
//         state.value -= 1
//       },
//       incrementByAmount: (state, action) => {
//         state.value += action.payload
//       },
//     },
//   })
  
//   // Action creators are generated for each case reducer function
//   export const { increment, decrement, incrementByAmount } = counterSlice.actions
  
//   export default counterSlice.reducer