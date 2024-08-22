import { Input, Box } from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';

interface Props {
  id: string;
  value: string;
  onChange: (newValue: string) => void;
}

const Cell: React.FC<Props> = ({ value, onChange, id }) => {
  // This boolean is responsible for toggling the editable state of the cell,
  // this is to allow for spreadsheet navigation using arrows as we will not want to
  // focus input on arrow press as this will capture the key press event and not allow for navigation
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const onKeyDownHandler = useCallback<
    React.KeyboardEventHandler<HTMLInputElement | HTMLDivElement>
  >(
    (ev) => {
      if (ev.key === 'Enter') {
        if (isEditing) {
          inputRef.current?.blur();
          inputRef.current?.focus();
        } else {
          setIsEditing(true);
        }
      }
    },
    [isEditing],
  );

  // Could try and use Chakra's `useControllable` hook here, didn't have time to digest documentation fully
  const isNumericValue = value !== '' && new RegExp('^[0-9]*$').test(value);
  const displayValue = isNumericValue
    ? Intl.NumberFormat('en-US', {
        // We only care about en-US / USD for now
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(Number(value))
    : value;

  return (
    <Box onDoubleClick={onDoubleClickHandler} onKeyDown={onKeyDownHandler}>
      {isEditing ? (
        <Input
          id={id}
          ref={inputRef}
          value={value}
          borderRadius={0}
          width="full"
          onChange={onChangeHandler}
          px="0.5rem"
          onBlur={onBlurHandler}
          onKeyDown={onKeyDownHandler}
        />
      ) : (
        <Input
          id={id}
          value={displayValue}
          borderRadius={0}
          width="full"
          px="0.5rem"
          readOnly={true}
        />
      )}
    </Box>
  );
};

export default Cell;
