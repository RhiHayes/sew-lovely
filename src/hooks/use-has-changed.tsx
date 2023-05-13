import { useEffect, useRef } from "react";

const useHasChanged = (val: any) => {
    const prevVal = usePrevious(val)
    return prevVal !== val
}

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

export default useHasChanged;