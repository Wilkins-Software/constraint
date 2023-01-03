import React, { useEffect, useRef, useState } from 'react';
import { ConstrainedInputProps } from './input';

export const Textarea = ({
  checker,
  errorMessage,
  ...props
}: React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  ConstrainedInputProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    if (!ref.current) return;
    const isValid = checker(value);
    if (!isValid) {
      ref.current.setCustomValidity(
        errorMessage ? errorMessage(value) : 'Invalid value'
      );
    }
  }, [value]);

  return (
    <textarea
      onChange={e => {
        ref.current?.setCustomValidity('');
        setValue(e.target.value);
      }}
      ref={ref}
      {...props}
    />
  );
};
