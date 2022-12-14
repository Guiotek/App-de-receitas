import { screen, waitFor } from '@testing-library/react';
import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

afterEach(() => jest.clearAllMocks());

describe('Implementa testes na tela de Busca', () => {
  test('Testa elementos na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    const { history } = renderWithRouter(<App />, '/meals/52977/in-progress');

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977/in-progress'));
    await waitFor(() => expect(screen.getByTestId('share-btn')).toBeInTheDocument());
  });

  test('Testa funções dos checkbox', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

    const { history } = renderWithRouter(<App />, '/drinks/178319/in-progress');

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319/in-progress'));
    await waitFor(() => expect(screen.getByTestId('share-btn')).toBeInTheDocument());

    const ingredient1 = await screen.findByTestId('0-ingredient-step');
    const finishBtn = await screen.findByTestId('finish-recipe-btn');

    const checkIngredient1 = await screen.findByTestId('0-check-ingredient');
    const checkIngredient2 = await screen.findByTestId('1-check-ingredient');
    const checkIngredient3 = await screen.findByTestId('2-check-ingredient');

    expect(checkIngredient1).toBeInTheDocument();
    expect(ingredient1).toBeInTheDocument();

    expect(finishBtn).toBeDisabled();

    userEvent.click(checkIngredient1);
    userEvent.click(checkIngredient2);
    userEvent.click(checkIngredient3);

    expect(checkIngredient1).toBeChecked();
    expect(checkIngredient2).toBeChecked();
    expect(checkIngredient3).toBeChecked();

    await waitFor(() => {
      expect(finishBtn).toBeEnabled();
    });

    userEvent.click(checkIngredient1);

    userEvent.click(finishBtn);

    console.log(history);
  });
});
