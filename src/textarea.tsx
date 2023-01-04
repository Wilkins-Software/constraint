import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { ConstrainedInputProps } from './input';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > &
    ConstrainedInputProps
>(function _Textarea({ checker, errorMessage, ...props }, passedRef) {
  const _ref = useRef<HTMLTextAreaElement>(null);
  const ref = (passedRef || _ref) as React.RefObject<HTMLTextAreaElement>;

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
    <textarea
      onChange={e => {
        ref.current?.setCustomValidity('');
        setValue(e.target.value);
      }}
      ref={ref}
      {...props}
    />
  );
});
