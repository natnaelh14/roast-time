import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { GuestAccountProps } from 'types';

const WithClickOutside = (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    const Component = () => {
        const [isDropDownHidden, setDropDownHidden] = useState(true);

        const ref = useRef();
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (!ref?.current?.contains(event.target)) {
                    setDropDownHidden(true);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
        }, [ref]);
        return <WrappedComponent isDropDownHidden={isDropDownHidden} setDropDownHidden={setDropDownHidden} ref={ref} />;
    }
    return Component;
}

export default WithClickOutside;
