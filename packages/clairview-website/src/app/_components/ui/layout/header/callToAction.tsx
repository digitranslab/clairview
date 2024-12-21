import {
  CallToActionContainer,
  LinkNextToCTA,
  StyledButton,
} from '@/app/_components/ui/layout/header/styled';

export const CallToAction = () => {
  return (
    <CallToActionContainer>
      <LinkNextToCTA href="https://app.clairview.io">Sign in</LinkNextToCTA>
      <a href="https://app.clairview.io">
        <StyledButton>Get Started</StyledButton>
      </a>
    </CallToActionContainer>
  );
};
