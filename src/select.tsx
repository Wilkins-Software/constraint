import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { ConstrainedInputProps } from './input';

export const Select = forwardRef<
  HTMLSelectElement,
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > &
    ConstrainedInputProps
>(function _Select({ checker, errorMessage, onChange, ...props }, passedRef) {
  const _ref = useRef<HTMLSelectElement>(null);
  const ref = (passedRef || _ref) as React.RefObject<HTMLSelectElement>;

  const [value, setValue] = useState(props.value || props.defaultValue || '');

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
        onChange?.(e);
      }}
      ref={ref}
      {...props}
    />
  );
});
