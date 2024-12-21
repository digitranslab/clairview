import {
  AnimatedPlaceholder,
  AnimatedPlaceholderEmptyContainer,
  AnimatedPlaceholderEmptyTextContainer,
  AnimatedPlaceholderEmptyTitle,
  Loader,
} from 'clairview-ui';

export const EmailLoader = ({ loadingText }: { loadingText?: string }) => (
  <AnimatedPlaceholderEmptyContainer>
    <AnimatedPlaceholder type="loadingMessages" />
    <AnimatedPlaceholderEmptyTextContainer>
      <AnimatedPlaceholderEmptyTitle>
        {loadingText || 'Loading emails'}
      </AnimatedPlaceholderEmptyTitle>
      <Loader />
    </AnimatedPlaceholderEmptyTextContainer>
  </AnimatedPlaceholderEmptyContainer>
);
