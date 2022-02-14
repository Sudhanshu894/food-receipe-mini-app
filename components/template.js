const layout = (header) =>{
    return `<div class="main-container">
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="latest.html">Latest</a></li>
        <li>
          <a href="popular.html">Popular</a>
        </li>
        <li>
          <a href="fav.html"><i class="fas fa-heart"></i><span id="count" >0</span></a>
        </li>
      </ul>
    </nav>
    <div class="searchbox">
      <input type="text" placeholder="Search for Your craving" id="search"/>
      <button id="btn">Search</button>
      <div class="search-results"></div>
    </div>
    <div class="container">
      <div><span></span>${header}<span></span></div>
      <div class="showdishes"></div>
    </div>
  </div>`
}
const navbar = () =>{
  return `<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="latest.html">Latest</a></li>
    <li>
      <a href="popular.html">Popular</a>
    </li>
    <li>
      <a href="fav.html"><i class="fas fa-heart"></i><span id="count" >0</span></a>
    </li>
  </ul>
</nav>`
}
const getfooditems = async (key,category) => {
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?${key}=${category}`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    data = data.meals;
    console.log("data:", data);
    return appendfooditems(data);
  } catch (err) {
    console.log("err:", err);
  }
};
const appendfooditems = (data) => {
  data.forEach(({ strMealThumb, strMeal }) => {
    var fooditems = document.createElement("div");
    fooditems.setAttribute("class", "fooditems");
    var foodimg = document.createElement("img");
    foodimg.src = strMealThumb;
    var name = document.createElement("p");
    name.textContent = strMeal;
    fooditems.append(foodimg, name);
    document.querySelector(".showdishes").append(fooditems);
  });
};
// const searchselect = (inputvalue) => {
//   let inputbox = document.querySelector(".searchbox > input");
//   inputbox.addEventListener("focus", () => {
//     showresults();
//   });
// };
// const searchfood = async(inputvalue) =>{
//   let res = fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${inputvalue}`);
//   let data = res.json;
//   console.log(data);
// }



var timerid;
  let showresults = () => {
    document.querySelector(".search-results").style.display = "block";

    const throttleFunction = (func, delay) => {
      if (timerid) {
        clearTimeout(timerid);
      }

      timerid = setTimeout(() => {
        func();
      }, delay);
    };
    throttleFunction(main, 1000);
  };

  const main = async () => {
    let name = document.getElementById("search").value;
    if (name.length <= 2) {
      return false;
    }

    let food = await searchfooditems(name);
    console.log(food);

    displayfoodnames(food);
  };


  const searchfooditems = async (name) => {
    document.querySelector(".search-results").innerHTML = null;

    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );

    let datacall = await response.json();
    return datacall.meals;
  };
var saveitem;
  const displayfoodnames = async (food) => {
    if (food === undefined) {
      return false;
    }

    food.forEach((items) => {
      let namediv = document.createElement("div");
      namediv.setAttribute('class','namediv');
      namediv.addEventListener('click',()=>{
        saveitem = [];
        saveitem.push(items);
        localStorage.setItem('savefooditems',JSON.stringify(saveitem));
        console.log(saveitem[0]);
        window.location.href = 'recipe.html';
      })
      let fooditem = document.createElement('p');
      fooditem.textContent = items.strMeal;
      namediv.append(fooditem);
      document.querySelector('.search-results').append(namediv);
    });
  };
export {layout,navbar, getfooditems, showresults};