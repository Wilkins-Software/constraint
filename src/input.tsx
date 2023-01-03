import React, { useEffect, useRef, useState } from 'react';

export type ConstrainedInputProps = {
  checker: (value: unknown) => boolean;
  errorMessage?: (value: unknown) => string;
};

export const Input = ({
  checker,
  errorMessage,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  ConstrainedInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
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
    <input
      onChange={e => {
        ref.current?.setCustomValidity('');
        setValue(e.target.value);
      }}
      ref={ref}
      {...props}
    />
  );
};
