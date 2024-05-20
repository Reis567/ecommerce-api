// PopupNotification.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface PopupNotificationProps {
  message: string;
  visible: boolean;
}

const slideIn = keyframes`
  from {
    right: -300px;
  }
  to {
    right: 20px;
  }
`;

const slideOut = keyframes`
  from {
    right: 20px;
  }
  to {
    right: -300px;
  }
`;

const PopupContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 20px;
  right: ${(props) => (props.visible ? '20px' : '-300px')};
  width: 250px;
  padding: 15px;
  background-color: #b0e57c;
  color: #333;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${(props) => (props.visible ? slideIn : slideOut)} 0.5s forwards;
  z-index: 1000;
`;

const PopupNotification: React.FC<PopupNotificationProps> = ({ message, visible }) => {
  return <PopupContainer visible={visible}>{message}</PopupContainer>;
};

export default PopupNotification;
