import { configureStore } from '@reduxjs/toolkit'
// import counterReducer  from './slice'
import staffSlice from './slice'

const reducer = {
  // counter: counterReducer
  staff: staffSlice
}

const store = configureStore({
  reducer: reducer,
})

export default store