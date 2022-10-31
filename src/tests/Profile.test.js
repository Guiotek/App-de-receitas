import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testa Profile', () => {
  test('Profile elements', () => {
    renderWithRouter(<App />, '/');

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const enter = screen.getByRole('button', { name: /enter/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(enter).toBeInTheDocument();

    userEvent.type(email, 'aaaaa@aaa.com');
    userEvent.type(password, 'aaaaaaaaa');
    userEvent.click(enter);

    const button = screen.getByRole('link', {
      name: /profile/i,
    });
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const title = screen.getByTestId('page-title');
    const emailProfile = screen.getByTestId('profile-email');
    const btnOne = screen.getByTestId('profile-done-btn');
    const btnTwo = screen.getByTestId('profile-favorite-btn');
    const logout = screen.getByTestId('profile-logout-btn');

    expect(title).toBeInTheDocument();
    expect(emailProfile).toBeInTheDocument();
    expect(btnOne).toBeInTheDocument();
    expect(btnTwo).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });
});

describe('Profile tests', () => {
  test('testa funcinalidades', () => {
    renderWithRouter(<App />, '/profile');

    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');

    userEvent.click(buttonDoneRecipes);

    const titleDoneRecipes = screen.getByText(/done recipes/i);

    expect(titleDoneRecipes).toBeInTheDocument();

    const buttonProfile = screen.getByRole('link', {
      name: /profile/i,
    });

    userEvent.click(buttonProfile);

    const buttonFavorite = screen.getByTestId('profile-favorite-btn');

    userEvent.click(buttonFavorite);

    const titleFavorite = screen.getByText(/favorite recipes/i);

    expect(titleFavorite).toBeInTheDocument();

    const btnProfile = screen.getByTestId('profile-top-btn');

    userEvent.click(btnProfile);

    const logout = screen.getByTestId('profile-logout-btn');

    userEvent.click(logout);

    const login = screen.getByText(/login/i);

    expect(login).toBeInTheDocument();
  });
});
