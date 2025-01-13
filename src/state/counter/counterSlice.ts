import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface CounterState { value:number, login_status:boolean}
const initialState:CounterState = { value:0, login_status:false}
const counterSlice = createSlice({
    name:"Counter",
    initialState,
    reducers:{
        increment:(state) => { state.value+=1;},
        decrement:(state) => { state.value-=1;},
        incrementByAmount:(state, action:PayloadAction<number>) => { state.value+=action.payload;},
        loggedin:(state, action:PayloadAction<boolean>) => { state.login_status=action.payload;},
    },
})

export const { increment, decrement, incrementByAmount, loggedin } = counterSlice.actions;
export default counterSlice.reducer;