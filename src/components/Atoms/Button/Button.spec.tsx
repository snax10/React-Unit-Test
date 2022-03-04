import React from 'react';
import { render } from '@testing-library/react';
import Button from '.';

describe('Teste do componente Button', () => {
  test('renderização sem quebrar', () => {
    const { getByTestId } = render(<Button size="default" />);

    expect(getByTestId('pure_button')).toBeInTheDocument();
  });
});
