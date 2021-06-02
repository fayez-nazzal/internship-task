import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

import { toggleTheme } from '../redux/theme';

const properties = {
  sun: {
    r: 9,
    transform: 'rotate(40deg)',
    cx: 12,
    cy: 4,
    opacity: 0,
  },
  moon: {
    r: 5,
    transform: 'rotate(90deg)',
    cx: 30,
    cy: 0,
    opacity: 1,
  },
  springConfig: { mass: 7, tension: 250, friction: 35 },
};

const Container = styled.span`
  position: absolute;
  top: 2%;
  right: 1%;
  width: 64px;
  height: 64px;
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) => (props.dark ? '#FFFFFF' : '#1B1E1F')};
`;

const ThemeToggler = () => {
  const theme = useSelector((state) => state.theme);

  const { r, transform, cx, cy, opacity } =
    properties[theme === 'light' ? 'sun' : 'moon'];
  const svgContainerProps = useSpring({
    transform,
    config: properties.springConfig,
  });
  const centerCircleProps = useSpring({ r });
  const maskedCircleProps = useSpring({ cx, cy });
  const linesProps = useSpring({ opacity });
  const shapeColor = theme === 'dark' ? '#ddb961' : '#FFCC33';

  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <Container dark={theme === 'dark'}>
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={toggleDarkMode}
        style={{
          cursor: 'pointer',
          ...svgContainerProps,
        }}
      >
        <mask id="myMask2">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <animated.circle style={maskedCircleProps} r="9" fill="black" />
        </mask>

        <animated.circle
          cx="12"
          cy="12"
          style={centerCircleProps}
          fill={shapeColor}
          mask="url(#myMask2)"
        />
        <animated.g stroke={shapeColor} style={linesProps}>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </animated.g>
      </animated.svg>
    </Container>
  );
};

export default ThemeToggler;
