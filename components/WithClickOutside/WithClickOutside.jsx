import { GuestAccountProps } from 'types';
import React, { useState, useRef, useEffect, MouseEvent } from 'react';

const WithClickOutside = (WrappedComponent) => {
  // eslint-disable-next-line
  const Component = () => {
    const [isDropDownHidden, setDropDownHidden] = useState(true);

    const ref = useRef();
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
          setDropDownHidden(true);
        }
      };
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line
        window.document.addEventListener('mousedown', handleClickOutside);
      }
    }, [ref]);
    return (
      <WrappedComponent
        isDropDownHidden={isDropDownHidden}
        setDropDownHidden={setDropDownHidden}
        ref={ref}
      />
    );
  };
  return Component;
};

export default WithClickOutside;
