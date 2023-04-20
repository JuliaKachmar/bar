// Define variables
const ginBtn = document.getElementById('gin-btn');
const vodkaBtn = document.getElementById('vodka-btn');
const whiskeyBtn = document.getElementById('whiskey-btn');
const cocktailUl = document.getElementById('cocktail-ul');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Define event listeners for alcohol type buttons
ginBtn.addEventListener('click', () => {
  getCocktails('gin');
});

vodkaBtn.addEventListener('click', () => {
  getCocktails('vodka');
});

whiskeyBtn.addEventListener('click', () => {
  getCocktails('whiskey');
});

// Define event listener for search form
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    getCocktails(searchTerm);
    searchInput.value = '';
  }
});

// Function to get cocktails based on alcohol type or search term
function getCocktails(searchTerm) {
  // Clear previous cocktail list
  cocktailUl.innerHTML = '';

  // Make API request
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const cocktails = response.drinks;
      if (cocktails) {
        // Loop through cocktails and display them
        cocktails.forEach((cocktail) => {
          const cocktailLi = document.createElement('li');
          cocktailLi.classList.add('cocktail-li');

          const cocktailImg = document.createElement('img');
          cocktailImg.classList.add('cocktail-img');
          cocktailImg.src = cocktail.strDrinkThumb;
          cocktailImg.alt = cocktail.strDrink;

          const cocktailName = document.createElement('h3');
          cocktailName.classList.add('cocktail-name');
          cocktailName.textContent = cocktail.strDrink;
	  
          //ingredients
          let ingredientsList = [cocktail.strIngredient1, cocktail.strIngredient2, cocktail.strIngredient3,
                                   cocktail.strIngredient4, cocktail.strIngredient5, cocktail.strIngredient6, 
                                   cocktail.strIngredient7, cocktail.strIngredient8, cocktail.strIngredient9, 
                                   cocktail.strIngredient10, cocktail.strIngredient11, cocktail.strIngredient12, 
                                   cocktail.strIngredient13, cocktail.strIngredient14, cocktail.strIngredient15];
	  
          let ingredientLi = document.createElement('p');
          ingredientLi.classList.add('ingredient-li');
          let ingredientsContent = '';
          ingredientsList.forEach((ingredient) => {
	    if (ingredient != null) {
	      ingredientsContent = ingredientsContent.concat(', ', ingredient);
            }
          });
          ingredientLi.textContent = ingredientsContent.slice(2);
          cocktailLi.appendChild(cocktailImg);
          cocktailLi.appendChild(cocktailName);
	  cocktailLi.appendChild(ingredientLi);
          cocktailLi.addEventListener('click', function() {
            if (ingredientLi.classList.contains('show')) {
             ingredientLi.classList.remove('show');
            } else {
             ingredientLi.classList.add('show');
            }
          }, false);

          cocktailUl.appendChild(cocktailLi);
        });
      } else {
        // No cocktails found
        const noCocktailsLi = document.createElement('li');
        noCocktailsLi.textContent = 'No cocktails found.';
        cocktailUl.appendChild(noCocktailsLi);
      }
    } else {
      // Error getting cocktails
      const errorLi = document.createElement('li');
      errorLi.textContent = 'Error getting cocktails.';
      cocktailUl.appendChild(errorLi);
    }
  };
  xhr.send();
}
