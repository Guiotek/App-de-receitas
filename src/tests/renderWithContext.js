import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Provider from '../context/Provider';
import App from '../App';

export default function renderWithContext() {
  const history = createMemoryHistory();

  return (
    render(
      <Provider history={ history }>
        <App />
      </Provider>,
    )
  );
}
