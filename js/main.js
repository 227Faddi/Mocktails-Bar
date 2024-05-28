let getDrinkBtn = document.querySelector('#getDrink')

getDrinkBtn.addEventListener('click', getdrink)

function getdrink(){
  let drinkNameHolder = document.querySelector('#drinkName');
  let drinkImgHolder = document.querySelector('#drinkImg');
  let drinkInstructionHolder = document.querySelector('#drinkInstruction')
  let drinkIngredients = document.querySelector('#drinkIngredients')

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    // GENERATE A RANDOM NUM TO PICK A DRINK
    let count = Math.floor(Math.random() * (data.drinks.length - 1));
    
    // STORE NAME AND IMG OF THE DRINK
    let drinkName = data.drinks[count].strDrink
    let drinkImg = data.drinks[count].strDrinkThumb
    let drinkId = data.drinks[count].idDrink

    // REMOVE HIDDEN CLASS FROM ELEMENTS
    let hidden = document.querySelectorAll('.hidden');
    Array.from(hidden).forEach((item) => item.classList.toggle('hidden'))
    
    // PLACE NAME AND IMG INTO THE DOM
    drinkNameHolder.innerText = drinkName
    drinkImgHolder.src = `${drinkImg}`
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

      // reset the ul
      drinkIngredients.innerHTML = '';

      console.log(data.drinks[0])

      // set instructions
      let drinkInstruction = data.drinks[0].strInstructions
      drinkInstructionHolder.innerText = drinkInstruction

      for(let i = 1; i <= 15; i++){


        let ingredient = data.drinks[0][`strIngredient${i}`];
        let measure = data.drinks[0][`strMeasure${i}`];

        console.log(ingredient)
        console.log(measure)
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




    getDrinkBtn.innerText = 'Get Another One!'
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
}




