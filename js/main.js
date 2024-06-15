const getDrinkBtn = document.querySelector('#getDrink')
const drinkContainer = document.querySelector('.app');
const drinkNameHolder = document.querySelector('#drinkName');
const drinkImgHolder = document.querySelector('#drinkImg');
const drinkInstructionsHolder = document.querySelector('#drinkInstructions');
const drinkIngredients = document.querySelector('#drinkIngredients');

getDrinkBtn.addEventListener('click', getDrink)

async function getDrink(){
  try{  
    // THE SIZE OF CONTAINER ON BIGGER SCREENS
    if (window.matchMedia('(min-width: 600px)').matches) {
      drinkContainer.style.minHeight = '950px';
      drinkContainer.style.width = '600px'
      drinkImgHolder.style.maxWidth = '150px';
    }
    if (window.matchMedia('(min-width: 992px)').matches) {
      drinkContainer.style.minHeight = '800px';
      drinkContainer.style.width = '850px'
      drinkImgHolder.style.maxWidth = '200px';
    }

    // #1 fetch
    const drinksRes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`);
    if(!drinksRes.ok){
      throw new Error (`Could not fetch the data`)
    }
    const drinksData = await drinksRes.json()

    const randomNumber = Math.floor(Math.random() * (drinksData.drinks.length - 1));
    const drinkId = drinksData.drinks[randomNumber].idDrink
    
    // #2 fetch
    const drinkDetailRes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
    if(!drinkDetailRes.ok){
      throw new Error (`Could not fetch the data`)
    }
    const drinkDetailData = await drinkDetailRes.json();

    // SHOWING HIDDEN ELEMENTS
    const hidden = document.querySelectorAll('.hidden');
    Array.from(hidden).forEach((item) => item.classList.toggle('hidden'))

    const drinkImg = drinkDetailData.drinks[0].strDrinkThumb
    const drinkName = drinkDetailData.drinks[0].strDrink
    const drinkInstructions = drinkDetailData.drinks[0].strInstructions;

    // CLEAR PREVIOUS INGREDIENTS
    drinkIngredients.innerHTML = '';
    // PLACING INGREDIENTS TO THE DOM
    for(let i = 1; i <= 15; i++){
      const ingredient = drinkDetailData.drinks[0][`strIngredient${i}`];
      const measure = drinkDetailData.drinks[0][`strMeasure${i}`];

      if(ingredient){
        let li = document.createElement('li')
        li.innerText = `${measure ? measure : ''} ${ingredient}.`.trim()
        drinkIngredients.appendChild(li)
      }
    }
    // PLACING DATA TO THE DOM
    drinkImgHolder.src = `${drinkImg}`;
    drinkNameHolder.innerText = drinkName;
    drinkInstructionsHolder.innerText = drinkInstructions

    getDrinkBtn.innerText = 'Get Another One!'
  }
  catch(err){
    console.log(`Error : ${err}`)
  }
}




