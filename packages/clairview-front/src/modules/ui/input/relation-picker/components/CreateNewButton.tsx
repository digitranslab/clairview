import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MenuItem } from 'clairview-ui';

const StyledCreateNewButton = styled(MenuItem)<{ hovered?: boolean }>`
  ${({ hovered, theme }) =>
    hovered &&
    css`
      background: ${theme.background.transparent.light};
    `}
`;

export const CreateNewButton = StyledCreateNewButton;
