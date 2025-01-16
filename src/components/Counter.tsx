import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../state/store'
import { increment, decrement, incrementByAmount } from '../state/counter/counterSlice';
function Counter() {
    const count = useSelector((state:RootState) => state.counter.value);
    const dispatch =useDispatch()
  return (
    <div>
      <h1>Count: {count}</h1>
      <div>
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(decrement())}>-</button>
        <button onClick={()=>dispatch(incrementByAmount(17))}>+17</button>
      </div>
    </div>
  )
}

export default Counter
