import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Implementa testes na tela de Busca', () => {
  test('Testa elementos na tela', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals/52977/in-progress'] });

    console.log(history);

    const btnShare = screen.getByRole('button', { name: /compartilhar/i });

    expect(btnShare).toBeInTheDocument();
  });
});
