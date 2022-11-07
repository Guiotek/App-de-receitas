import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';

// const doneRecipes = [
//   {
//     id: '52771',
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

describe('Implementa testes na tela de Busca', () => {
  test('Testa funções dos checkbox', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

    const { history } = renderWithRouter(<App />, '/drinks/178319/in-progress');

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319/in-progress'));
    await waitFor(() => expect(screen.getByTestId('share-btn')).toBeInTheDocument());

    const finishBtn = await screen.findByTestId('finish-recipe-btn');

    const checkIngredient1 = await screen.findByTestId('0-check-ingredient');
    const checkIngredient2 = await screen.findByTestId('1-check-ingredient');
    const checkIngredient3 = await screen.findByTestId('2-check-ingredient');

    userEvent.click(checkIngredient1);
    userEvent.click(checkIngredient2);
    userEvent.click(checkIngredient3);

    userEvent.click(finishBtn);

    console.log(history.location.pathname);

    history.push('/done-recipes');

    console.log(history.location.pathname);

    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
  });
});
