import React from 'react';
import { useState } from 'react';

const HighlightedDay = (props) => {
  const [hovered, setHovered] = useState(false);

  return React.cloneElement(props.component, {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      boxShadow: `inset 0px 0px 0px 3px ${hovered ? '#00b4d8' : '#90e0ef'}`,
    },
  });
};

export default HighlightedDay;
