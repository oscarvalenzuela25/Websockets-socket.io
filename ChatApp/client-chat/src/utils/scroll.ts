import { animateScroll } from 'react-scroll';

export const scrollToBottom = (componentId: string) => {
  animateScroll.scrollToBottom({
    containerId: componentId,
    duration: 0,
  });
};

export const scrollToBottomAnimated = (componentId: string) => {
  animateScroll.scrollToBottom({
    containerId: componentId,
    duration: 250,
  });
};
