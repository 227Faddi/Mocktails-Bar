let getDrinkBtn = document.querySelector('#getDrink')

getDrinkBtn.addEventListener('click', getDrink)

function getDrink(){
  // DOM ELEMENTS
  let drinkContainer = document.querySelector('.app');
  let drinkNameHolder = document.querySelector('#drinkName');
  let drinkImgHolder = document.querySelector('#drinkImg');
  let drinkInstructionsHolder = document.querySelector('#drinkInstructions');
  let drinkIngredients = document.querySelector('#drinkIngredients');

  // THE SIZE OF CONTAINER ON BIGGER SCREENS
  if (window.matchMedia('(min-width: 600px)').matches) {
    drinkContainer.style.minHeight = '900px';
    drinkContainer.style.width = '700px'
    drinkImgHolder.style.maxWidth = '250px';
  }

  // FIRST FETCH TO GET A RANDOM DRINK
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)
  .then(res => res.json()) // RESPONSE TO JSON
  .then(data => {
    // GENERATE A RANDOM NUM TO PICK A DRINK
    let count = Math.floor(Math.random() * (data.drinks.length - 1));

    // STORE NAME AND IMG OF THE DRINK
    let drinkName = data.drinks[count].strDrink
    let drinkImg = data.drinks[count].strDrinkThumb
    let drinkId = data.drinks[count].idDrink

    // SHOW HIDDEN ELEMENTS
    let hidden = document.querySelectorAll('.hidden');
    Array.from(hidden).forEach((item) => item.classList.toggle('hidden'))
    
    // PLACE NAME AND IMG INTO THE DOM
    drinkNameHolder.innerText = drinkName
    drinkImgHolder.src = `${drinkImg}`

    // SECOND FETCH TO GET INGREDIENTS AND INSTRUCTION OF THE DRINK
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
    .then(res => res.json()) // RESPONSE TO JSON
    .then(data => {

      // CLEAR PREVIOUS INGREDIENTS
      drinkIngredients.innerHTML = '';

      // PLACE INSTRUCTIONS IN THE DOM
      drinkInstructionsHolder.innerText = data.drinks[0].strInstructions
      
      // LOOP TO CHECK THE NUM OF MEASURES AND INGREDIENTS AVAILABLE
      for(let i = 1; i <= 15; i++){
        let ingredient = data.drinks[0][`strIngredient${i}`];
        let measure = data.drinks[0][`strMeasure${i}`];
        if(ingredient !== null){
          let li = document.createElement('li')
          li.innerText = `${measure ? measure : ''} ${ingredient}.`.trim()
          drinkIngredients.appendChild(li)
        }
      }
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
    // CHANGE BUTTON TEXT TO GET ANOTHER ONE
    getDrinkBtn.innerText = 'Get Another One!'
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
}




