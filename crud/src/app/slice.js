import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    name: "",
    uid: "",
    //access_level: 0

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

const staffSlice = createSlice({
    name: 'staff info',
    initialState,
    reducer:{ //non-async reducers

    },
    extraReducers: { // async reducers 
        [testing.fulfilled]: (state, action) => {
            return [...action.payload];
          }
      }
})

export default staffSlice.reducer