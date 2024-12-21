import { Button, IconDeviceFloppy } from 'clairview-ui';

type SaveButtonProps = {
  onSave?: () => void;
  disabled?: boolean;
};

export const SaveButton = ({ onSave, disabled }: SaveButtonProps) => {
  return (
    <Button
      title="Save"
      variant="primary"
      size="small"
      accent="blue"
      disabled={disabled}
      onClick={onSave}
      Icon={IconDeviceFloppy}
    />
  );
};
