import { useMediaQuery } from 'react-responsive';
import { MOBILE_VIEWPORT } from 'clairview-ui';

export const useIsMobile = () =>
  useMediaQuery({ query: `(max-width: ${MOBILE_VIEWPORT}px)` });
