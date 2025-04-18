import React, { useEffect, useRef } from "react";

const UseDidMountEffect = (
  func: () => void,
  deps: React.DependencyList | undefined
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default UseDidMountEffect;
