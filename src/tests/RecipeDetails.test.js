import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Implementa testes na tela de Busca', () => {
  test('Testa elementos na tela de uma comida', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    const { history } = renderWithRouter(<App />, '/meals/52977');

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977'));
    await waitFor(() => expect(screen.getByTestId('share-btn')).toBeInTheDocument());

    const favoriteBtn = screen.getByTestId('favorite-btn');

    userEvent.click(favoriteBtn);

    const startBtn = screen.getByTestId('start-recipe-btn');

    userEvent.click(startBtn);

    await waitFor(() => userEvent.click(favoriteBtn));

    expect(global.fetch).toBeCalled();
  });

  test('Testa elementos na tela de uma bebida', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

    const { history } = renderWithRouter(<App />, '/drinks/178319');

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'));
    await waitFor(() => expect(screen.getByTestId('share-btn')).toBeInTheDocument());

    const favoriteBtn = screen.getByTestId('favorite-btn');

    userEvent.click(favoriteBtn);

    const startBtn = screen.getByTestId('start-recipe-btn');

    userEvent.click(startBtn);

    await waitFor(() => userEvent.click(favoriteBtn));

    expect(global.fetch).toBeCalled();
  });
});
