/// <reference types="./jquery" />



// api cod
const DisplayedData = document.querySelector('.DisplayedData')
const containerDetails = document.querySelector('.containerDetails')
const hideToArrive = document.querySelector('.hideToArrive')
const SearchMeal = document.querySelector('.fa-search')
const SearchbyMeal = document.getElementById('search')
SearchMeal.addEventListener('click',() =>{
        search(SearchbyMeal.value)
})
SearchbyMeal.addEventListener('keydown',(e) =>{
        if (e.code == 'Enter') {
            search(SearchbyMeal.value)
        }
})
async function getMeals(Code) {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${Code}`)
    response = await response.json()
    if (null != response) {
        $('.loadingg').fadeOut(600,()=> {
            $('.hideToArrive').fadeIn(500,()=> {
                DisplayStaticAndSearchedMeals(response.recipes)
                document.querySelector('footer').classList.remove('hidden')
            })

        })
    }
}
async function search(Code) {
    
    let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${Code}`)
    response = await response.json()
    $('.loadingg').fadeIn(100,()=> {
        if (null != response) {
            $('.loadingg').fadeOut(400,()=> {
                $('.hideToArrive').fadeIn(1,()=> {
                    DisplayStaticAndSearchedMeals(response.recipes)
                    document.querySelector('footer').classList.remove('hidden')
                })
            })
        }
    })
}
function DisplayStaticAndSearchedMeals(Response) {
    DisplayedData.innerHTML = ''
    
    for (let i = 0 ; i <Response.length; i ++ ) {
        DisplayedData.innerHTML+=`
        <div class="sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 rounded-xl  overflow-hidden">
            <figure class="rounded-xl overflow-hidden  ">
                <div class="h-[300px] w-full  contImg overflow-hidden">
                <img src="${Response[i].image_url}" class="w-full object-cover   h-[300px]" alt="">
                </div>
                <figcaption class="text-center px-3">
                    <h2 class="text-orange-500 text-2xl font-bold capitalize mt-4 dark:text-white hover:text-orange-500 duration-300 transition-colors">${Response[i].publisher.split(" ").slice(0,3).join(" ")}..</h2>
                    <p class="text-black text-lg font-bold capitalize  dark:text-gray-300 ">${Response[i].title.split(" ").slice(0,2).join(" ")}..</p>
                    <div class="flex justify-between mt-2 items-center ">
                        <a href="${Response[i].publisher_url}" target="_blanck" class="dark:bg-gray-700 dark:text-white dark:hover:bg-orange-500 dark:hover:text-black  text-white text-lg font-black bg-orange-500 px-4 py-2 rounded-lg hover:text-black hover:bg-slate-200 duration-300 transition-colors">Publisher</a>
                        <span class="dark:bg-gray-700 cursor-pointer dark:text-white dark:hover:bg-orange-500 dark:hover:text-black w-8 h-8 rounded-full hover:text-black hover:bg-slate-200 duration-300 transition-colors bg-orange-500 text-white  flex justify-center items-center font-bold text-md ">${Math.floor(Response[i].social_rank)}</span>
                        
                    </div>
                    <div class=" mt-2 text-center">
                        <button onclick="getSpacificId('${Response[i].recipe_id}')" class="w-full dark:bg-gray-700 dark:text-white dark:hover:bg-orange-500 dark:hover:text-black  text-white text-lg font-black bg-orange-500 px-4 py-2 rounded-lg hover:text-black hover:bg-slate-200 duration-300 transition-colors">View Meal</button>
                    </div>
                   
                    <button class="dark:bg-gray-700 dark:text-white dark:hover:bg-orange-500 dark:hover:text-black text-white w-full my-2 rounded-lg py-2 bg-orange-500 hover:text-black hover:bg-slate-200 duration-300 transition-colors font-bold"><a href="${Response[i].source_url}" target="_blanck">Source</a></button>
                </figcaption>
            </figure>
        </div>
    `
    }
}
async function getSpacificId(id) {
    localStorage.setItem('best meal',id)
    let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    response = await response.json()
    $('.loadingg').fadeIn(100,()=> {
        if (null != response) {
            $('.loadingg').fadeOut(400,()=> {
                DisplayedData.innerHTML = ''
                $('.details').fadeIn(1,()=> {
                    displayDeatials(response.recipe)
                    document.querySelector('footer').classList.remove('hidden')
                })
            })
        }
    })
}
function displayDeatials(MealDetails) {
    console.log(MealDetails);
        containerDetails.innerHTML += `
            <div class="sm:col-span-12 md:col-span-12 lg:col-span-5 ">
                <img src="${MealDetails.image_url}" class=" rounded-t-lg w-full" alt="">
            </div>
            <div class="sm:col-span-12 md:col-span-12 lg:col-span-7">
                <p class="text-4xl cursor-pointer text-orange-500 font-black hover:text-black group transition-colors duration-300 dark:text-white dark:hover:text-gray-300">${MealDetails.title}</p>
                <p class="text-xl cursor-pointer text-gray-900 font-black hover:text-orange-500 group transition-colors duration-300 dark:text-white dark:hover:text-gray-300">${MealDetails.publisher}</p>
                <p class="text-lg cursor-pointer text-orange-500 font-black hover:text-black group transition-colors duration-300 dark:text-white dark:hover:text-gray-300">ingredients :    <span class="text-gray-800 dark:text-white dark:hover:text-orange-500 duration-300 transition-colors ">${MealDetails.ingredients.toString().split(',').join('/')}</span> </p>
                <div class="mt-5">
                    <a href="${MealDetails.source_url}" target="_blanck" class=" dark:bg-gray-700 dark:text-white dark:hover:bg-orange-500 dark:hover:text-black  text-white text-lg font-black bg-orange-500 px-4 py-2 rounded-lg hover:text-black hover:bg-slate-200 duration-300 transition-colors">View</a>
                    <a href="${MealDetails.publisher_url}" target="_blanck" class=" dark:bg-gray-700 dark:text-white dark:hover:bg-orange-500 dark:hover:text-black  text-white text-lg font-black bg-orange-500 px-4 py-2 rounded-lg hover:text-black hover:bg-slate-200 duration-300 transition-colors">Publisher</a>
                    <a href="index.html"  class=" dark:bg-gray-700 dark:text-white dark:hover:bg-orange-500 dark:hover:text-black  text-white text-lg font-black bg-gray-500 px-4 py-2 rounded-lg hover:text-black hover:bg-slate-200 duration-300 transition-colors">Back <i class="fa-solid fa-arrow-left"></i></a>
                </div>
            </div>
        `
    }
getMeals(`Pasta`)


















// event !!!!!
const darkMode = document.querySelector('html')
const ChangeTheme = document.querySelector('.toggle')
let theme = localStorage.getItem('theme')
if (localStorage.getItem('theme') == 'dark') {
    darkMode.classList.remove('light')
    darkMode.classList.add('dark')
}
else {
    darkMode.classList.add('light')
    darkMode.classList.remove('dark')
}
ChangeTheme.addEventListener('change',()=> {
    if (darkMode.classList.contains('dark')) {
        darkMode.classList.add('light')
        darkMode.classList.remove('dark')
        theme = 'light'
        localStorage.setItem('theme',theme)
    }
    else {
        darkMode.classList.remove('light')
        darkMode.classList.add('dark')
        theme = 'dark'
        localStorage.setItem('theme',theme)
    }
})


