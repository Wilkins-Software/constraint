import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Input } from './input';

describe('It adds validations', () => {
  test('It adds a validation', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <form data-testid="form" onSubmit={onSubmit}>
        <Input
          data-testid="input"
          checker={() => false}
          errorMessage={() => 'is a bad :('}
        />
        <button data-testid="submit">submit</button>
      </form>
    );
    const form = getByTestId('form') as HTMLFormElement;
    const input = getByTestId('input') as HTMLInputElement;
    const submit = getByTestId('submit');
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalled();

    expect(input.validity.valid).toBeFalsy();
    expect(input.validity.customError).toBeTruthy();
    expect(form.checkValidity()).toBeFalsy();
  });
});
