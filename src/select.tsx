import React, { useEffect, useRef, useState } from 'react';
import { ConstrainedInputProps } from './input';

export const Select = ({
  checker,
  errorMessage,
  ...props
}: React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  ConstrainedInputProps) => {
  const _ref = useRef<HTMLSelectElement>(null);
  const ref = (props.ref || _ref) as React.RefObject<HTMLSelectElement>;

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
    <select
      onChange={e => {
        ref.current?.setCustomValidity('');
        setValue(e.target.value);
      }}
      ref={ref}
      {...props}
    />
  );
};
