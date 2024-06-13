const seachFood = () => {
    const search_text = document.getElementById("seach-box").value;
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_text}`)
    .then(res=>res.json())
    .then(data=>{
        if (data){
            displayData(data.meals);
        }
        else{
            console.log("Not Found!")
        }
    })
}

const displayData = (meals) =>{
    const container = document.getElementById("meal-container")

    if (meals != undefined || meals != null){
        document.getElementById("details-meal-container").innerHTML = "";
        meals.forEach(meal => {
            const div = document.createElement("div")

            div.classList.add("meal")

            div.innerHTML = `
                <img class="meal-img" src=${meal.strMealThumb}>
                <h1 class="meal-title">${meal.strMeal}</h1>
                <button class="details-btn" onclick="fetch_ingedients('${meal.strMealThumb}', '${meal.strMeal}', '${meal.idMeal}')">Details</button>
            `
            //<button onclick="showDetails('${meal.strMealThumb}', '${meal.strMeal}', '${meal.idMeal}')">Details</button>
            container.appendChild(div);
            document.getElementById("seach-box").value = "";

        });
    }
    else{
        const details_section = document.getElementById("details-meal-container");

        const div = document.createElement("div")
        div.classList.add("not-found")

        div.innerHTML = `
        <h1>Not Found!</h1>
        `
        details_section.appendChild(div)
    }
}

const fetch_ingedients = (img_url, title, id) => {
    document.getElementById("details-meal-container").innerHTML=""
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data=>{
        var items = [];
        let meal = data.meals[0]; 
        for (let i = 1; i<=25; i++){
            let item = meal[`strIngredient${i}`]
            if (item != ""){
                items.push(item);
            }
        }
      
        const details_section = document.getElementById("details-meal-container");

        const div = document.createElement("div");
        const div2 = document.createElement("div");
    
        div.classList.add("details");
    
        div.innerHTML=`
            <img class="details-meal-img" src=${img_url}>
            <h1 class="text-success details-meal-title">${title}</h1>
            <h1 class="title2">Ingrediants</h1>
        `
        
        div2.classList.add("ingrediants")
        div2.innerHTML=`
        <ul>
            <li>${items[0]}</li>
            <li>${items[1]}</li>
            <li>${items[2]}</li>
            <li>${items[3]}</li>
            <li>${items[4]}</li>
            <li>${items[5]}</li>
            <li>${items[6]}</li>
            <li>${items[7]}</li>
            <li>${items[8]}</li>

        </ul>
        `
    
        details_section.appendChild(div);
        details_section.appendChild(div2);

    })
}