"use client"
import { useState, useMemo } from 'react'

const calcFib = (n: number): number => {
    if ( n > 2 ) {
      return calcFib(n - 1) + calcFib(n - 2);
    }
    return 1;
}
  
const useFib = () => {
  const [index, setIndex] = useState(0);
  const value = useMemo(() => calcFib(index),[index]);
  return {
    currentFib: value,
    index,
    setIndex
  }
}

export default useFib