import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const { setHeaderTitle,
    setHideSearch,
    recipesFilter,
    setRecipesFilter,
    isAlertVisible,
    setIsAlertVisible } = useContext(MyContext);

  useEffect(() => {
    setHeaderTitle('Done Recipes');
    setHideSearch(false);
    const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(storageDoneRecipes);
  }, []);

  const defineRightText = (recipe, index) => {
    if (recipe.type === 'meal') {
      return (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${recipe.nationality} - ${recipe.category}`}
        </p>
      );
    }
    return (
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {recipe.alcoholicOrNot}
      </p>
    );
  };

  const defineTagOrNot = (type, index, tags) => {
    if (type === 'meal') {
      return (
        <p>
          <span
            data-testid={ `${index}-${tags[0]}-horizontal-tag` }
          >
            {tags[0]}
          </span>
          {' '}
          <span
            data-testid={ `${index}-${tags[1]}-horizontal-tag` }
          >
            {tags[1]}
          </span>
        </p>
      );
    }
    return null;
  };

  const redirectPage = (type, id) => `/${type}s/${id}`;

  const handleShareBtn = (type, id) => {
    const THREE_SECONDS = 3000;
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, THREE_SECONDS);
  };

  const recipeCard = (recipes) => (recipes.map((recipe, index) => {
    const { id, type, image, name, doneDate, tags } = recipe;
    return (
      <div key={ index }>
        <Link to={ redirectPage(type, id) }>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <Link to={ redirectPage(type, id) }>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </p>
        </Link>
        {defineRightText(recipe, index)}
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          Done in:
          {' '}
          {doneDate}
        </p>
        {defineTagOrNot(type, index, tags)}
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ () => handleShareBtn(type, id) }
        >
          <img src={ shareIcon } alt="Share" />
        </button>
      </div>
    );
  }));

  const showAll = () => {
    if (doneRecipes !== null && doneRecipes.length !== 0) {
      return recipeCard(doneRecipes);
    }
    return <div><h3>No recipe done</h3></div>;
  };

  const showMeals = () => {
    if (doneRecipes !== null && doneRecipes.some(({ type }) => type === 'meal')) {
      const doneMeals = doneRecipes.filter(({ type }) => type === 'meal');
      return recipeCard(doneMeals);
    }
    return <div><h3>No meal recipe done</h3></div>;
  };

  const showDrinks = () => {
    if (doneRecipes !== null && doneRecipes.some(({ type }) => type === 'drink')) {
      const doneDrinks = doneRecipes.filter(({ type }) => type === 'drink');
      return recipeCard(doneDrinks);
    }
    return <div><h3>No drink recipe done</h3></div>;
  };

  return (
    <div>
      <Header />

      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setRecipesFilter({ all: true, meals: false, drinks: false }) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setRecipesFilter({ all: false, meals: true, drinks: false }) }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setRecipesFilter({ all: false, meals: false, drinks: true }) }
        >
          Drinks
        </button>
      </div>
      <div>
        {isAlertVisible && <div>Link copied!</div>}
        {recipesFilter.all && showAll()}
        {recipesFilter.meals && showMeals()}
        {recipesFilter.drinks && showDrinks()}
      </div>
      <Footer />
    </div>
  );
}
export default DoneRecipes;
