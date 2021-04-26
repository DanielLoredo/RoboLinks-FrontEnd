
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState, useMemo } from 'react';


// Custom hook that returns the width of the screen,
// a new width is returned after every window resizing is done
export function useDynamicWidthOfComponent(componentRef, debounceTime = 150) {
  const [componentWidth, setComponentWidth] = useState();

  const getComponentWidth = useCallback(() => {
    return componentRef?.current?.offsetWidth;
  }, [componentRef]);

  // Update (componentWidth), debounce helps avoiding unnecessary calls
  // NOTE: useMemo is used instead of useCallback only because
  // useCallback complains for not using an inline function
  const debouncedHandleWindowResize = useMemo(
    () => debounce(() => {
      setComponentWidth(getComponentWidth());
    }, debounceTime),
    [setComponentWidth, getComponentWidth, debounceTime]
  );

  // NOTE: this code only executes the first time the component renders.
  useEffect(() => {
    // Set the initial width of path-component
    setComponentWidth(getComponentWidth());
    // Starts the subscription to window-resizing, and sends a callback
    // that updates the (componentWidth) after every resize.
    window?.addEventListener('resize', debouncedHandleWindowResize);
    // Remove the subscription when the component unmounts
    // (to ensure only one subscription to window-resizing is active at a time)
    return () =>
      window?.removeEventListener('resize', debouncedHandleWindowResize);
  }, [debouncedHandleWindowResize, getComponentWidth]);

  return componentWidth;
}