import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Select } from './select';

describe('It adds validations', () => {
  test('It adds a validation', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <form data-testid="form" onSubmit={onSubmit}>
        <Select
          data-testid="select"
          checker={() => false}
          errorMessage={() => 'is a bad :('}
        />
        <button data-testid="submit">submit</button>
      </form>
    );
    const form = getByTestId('form') as HTMLFormElement;
    const select = getByTestId('select') as HTMLTextAreaElement;
    const submit = getByTestId('submit');
    expect(form).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalled();

    expect(select.validity.valid).toBeFalsy();
    expect(select.validity.customError).toBeTruthy();
    expect(form.checkValidity()).toBeFalsy();
  });
});
