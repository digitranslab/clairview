import { Button, IconBook2 } from 'clairview-ui';

export const SettingsReadDocumentationButton = () => {
  return (
    <Button
      title="Read documentation"
      variant="secondary"
      accent="default"
      size="small"
      Icon={IconBook2}
      to={'https://docs.clairview.io'}
      target="_blank"
    ></Button>
  );
};
