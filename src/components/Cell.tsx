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

  const isNumericValue = new RegExp('^[0-9]*$').test(value) && value !== '';
  const displayValue = isNumericValue
    ? Intl.NumberFormat('en-US', {
        // We only care about en-US / USD for now
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(Number(value))
    : value;

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
        <Input value={displayValue} borderRadius={0} width="full" px="0.5rem" readOnly={true} />
      )}
    </Box>
  );
};

export default Cell;
