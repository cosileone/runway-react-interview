import { Input, Box } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

const Cell: React.FC<Props> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (ev) => {
      onChange(ev.target.value);
    },
    [onChange],
  );

  const onDoubleClickHandler = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const onBlurHandler = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  return (
    <Box onDoubleClick={onDoubleClickHandler}>
      {isEditing ? (
        <Input
          value={value}
          borderRadius={0}
          width="full"
          onChange={onChangeHandler}
          px="0.5rem"
          onBlur={onBlurHandler}
        />
      ) : (
        <Input value={value} borderRadius={0} width="full" px="0.5rem" readOnly={true} />
      )}
    </Box>
  );
};

export default Cell;
