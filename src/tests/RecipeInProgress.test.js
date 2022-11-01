import { screen, waitFor } from '@testing-library/react';
import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Implementa testes na tela de Busca', () => {
  test('Testa elementos na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    const { history } = renderWithRouter(<App />, '/meals/52977/in-progress');

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977/in-progress'));
    await waitFor(() => expect(screen.getByTestId('share-btn')).toBeInTheDocument());
  });
});
