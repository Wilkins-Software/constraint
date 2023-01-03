import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Textarea } from './textarea';

describe('It adds validations', () => {
  test('It adds a validation', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <form data-testid="form" onSubmit={onSubmit}>
        <Textarea
          data-testid="textarea"
          checker={() => false}
          errorMessage={() => 'is a bad :('}
        />
        <button data-testid="submit">submit</button>
      </form>
    );
    const form = getByTestId('form') as HTMLFormElement;
    const textarea = getByTestId('textarea') as HTMLTextAreaElement;
    const submit = getByTestId('submit');
    expect(form).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalled();

    expect(textarea.validity.valid).toBeFalsy();
    expect(textarea.validity.customError).toBeTruthy();
    expect(form.checkValidity()).toBeFalsy();
  });
});
