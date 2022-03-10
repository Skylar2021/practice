import { configureStore } from '@reduxjs/toolkit'
// import counterReducer  from './slice'
import inAndOutSlice from './slice'

const reducer = {
  // counter: counterReducer
  loginOut: inAndOutSlice
}

const store = configureStore({
  reducer: reducer,
})

export default store