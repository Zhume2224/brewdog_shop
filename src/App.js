import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './components/Home';
import NavBar from './components/NavBar';
import WishList from './components/WishList';
import FilterBeer from './components/FilterBeer'
import BeerRandom from './components/BeerRandom';
import BeerInfo from './components/BeerInfo';
import Buttons from './components/Buttons'; 
import CheckOut from './components/CheckOut';



function App() {
  const [beer, setBeer] = useState(null);  
  const [showInfo, setShowInfo] = useState(false);
  const [selectedBeers, setSelectedBeers] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [allBeers,setAllBeers]=useState([]);
  const [filteredBeers,setFilteredBeers]=useState([]);
 


const getAllBeers=()=>{
  setAllBeers([
      {
        "id": 84,
        "name": "Stout Supreme",
        "description": "A rich and velvety stout with notes of chocolate and coffee.",
        "food_pairing": [
          "Grilled steak",
          "Dark chocolate cake",
          "Vanilla ice cream"
        ],
        "abv": 7.5,
        "image_url": "https://images.punkapi.com/v2/84.png",
        "price": 7.99
      },
      {
        "id": 85,
        "name": "Hoppy IPA",
        "description": "An intense IPA with a strong hop aroma and citrusy flavors.",
        "food_pairing": [
          "Spicy Thai curry",
          "Grilled pineapple",
          "Ginger cookies"
        ],
        "abv": 6.8,
        "image_url": "https://images.punkapi.com/v2/85.png",
        "price": 5.99
      },
      {
        "id": 86,
        "name": "Wheat Ale",
        "description": "A refreshing wheat ale with hints of banana and clove.",
        "food_pairing": [
          "Grilled fish tacos",
          "Fruit salad",
          "Lemon meringue pie"
        ],
        "abv": 5.2,
        "image_url": "https://images.punkapi.com/v2/86.png",
        "price": 6.49
      },
      {
        "id": 81,
        "name": "India Session Lager - Prototype Challenge",
        "description": "A refreshing and hoppy session lager with a crisp taste.",
        "food_pairing": [
          "Tomato and onion palmiers",
          "Bratwurst with sauerkraut",
          "Lemon drizzle cake"
        ],
        "abv": 4.4,
        "image_url": "https://images.punkapi.com/v2/keg.png",
        "price": 4.99
      },
      {
        "id": 83,
        "name": "American Pale Ale",
        "description": "A classic American-style pale ale with a citrusy hop aroma.",
        "food_pairing": [
          "Spicy grilled chicken wings",
          "Barbecue ribs",
          "Citrus fish"
        ],
        "abv": 5.6,
        "image_url": "https://images.punkapi.com/v2/keg.png",
        "price": 5.49
      },
      {
        "id": 82,
        "name": "Pilsen Lager",
        "description": "A traditional European-style pilsner with a clean and crisp flavor.",
        "food_pairing": [
          "Grilled shrimp skewers",
          "lamb schnitzel",
          "Cheesecake with fruit topping"
        ],
        "abv": 6.3,
        "image_url": "https://images.punkapi.com/v2/2.png",
        "price": 6.99
      }
    ]);}


    const getTotalPrice = (code) => {
      const price = selectedBeers.map((beer) => beer.price).reduce((a, b) => a + b, 0);
      
      if (code === null) {
        return price
      } else if (code === 'BREW15') {
        return price * 0.25;
      } else if (code === 'BREW50') {
        return price * 0.50;
      }
    };
    

const getRandomBeer = (beers) => {
  const randomIndex = Math.floor(Math.random() * beers.length);
  return beers[randomIndex];
};

  
const getBeer = () => {
        setBeer(getRandomBeer(allBeers));
        setIsSaved(false);
      };
  
  

  useEffect(() =>{getBeer()},[]);
  useEffect(()=>{getAllBeers()},[]);



  //showmore belongs to info button. onclick, set showinfo to true, triggers BeerInfo component to showup. 
  // ChatGPT: if the showInfo property is initially not present in the beer object, the code in the showMore function will add it with a value of true when the function is called for the first time. Subsequent calls to the showMore function for the same beer object will toggle the value of showInfo between true and false.

  // In summary, the showMore function dynamically adds the showInfo property to the beer object if it doesn't exist and toggles its value each time the function is called.
  const showMore = (beerId) => {
  setSelectedBeers((prevState) => {
    return prevState.map((beer) => {
      if (beer.id === beerId) {
        return { ...beer, showInfo: !beer.showInfo };
      }
      return beer;
    });
  });
  setShowInfo((pre)=>!pre);
};

  
  

 
    const saveSelected = (beerId) => {
      const selectedBeer = allBeers.find((beer) => beer.id === beerId)||beer.id===beerId;
      const isNewBeer = selectedBeers.some((selectedBeer) => selectedBeer.id === beerId);
      const changeSaveButton=()=>{
        isNewBeer?setIsSaved(true):setIsSaved(false);}
      
        setSelectedBeers([...selectedBeers, selectedBeer]);
        changeSaveButton();


    };

    const saveRandom = () => {
      const notNewBeer = selectedBeers.some((selectedBeer) => selectedBeer.id === beer.id);
      if (!notNewBeer) {
        setSelectedBeers([...selectedBeers, beer]);
        setIsSaved(true); 
      }
    };
    
    
  
  const removeBeer = (beerId) => {
    setSelectedBeers((prevState) => prevState.filter((beer) => beer.id !== beerId));
  };

// to check food in food pairing
  const handleInput = (food) => {
    const filteredBeers = allBeers.filter((beer) => {
      return beer.food_pairing.some((paired_food) => paired_food.toLowerCase().includes(food.toLowerCase()));
    });
  
    setFilteredBeers(filteredBeers);
  };
  
  


  return (
    <div className="App" style={{ backgroundImage: `url('./beer1.jpg')` }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home  selectedBeers={selectedBeers} removeBeer={removeBeer}/>} />

          <Route
                  path="/randomBeer"
                  element={
                    <BeerRandom
                      beer={beer}
                      getBeer={getBeer}
                      selectedBeers={selectedBeers}
                      isSaved={isSaved}
                      showInfo={showInfo}
                      saveRandom={saveRandom}
                    />}/>

     <Route path="/filterBeer" element={<FilterBeer allBeers={allBeers} handleInput={handleInput} filteredBeers={filteredBeers}  showMore={showMore} saveSelected={saveSelected} showInfo={showInfo} isSaved={isSaved} beer={beer} />} />
 
     <Route
  path="/basket"
  element={
    selectedBeers ? (
      <WishList selectedBeers={selectedBeers}  removeBeer={removeBeer} showMore={showMore} showInfo={showInfo}/>
    ) : null
  }
/>

<Route
  path="/checkout"
  element={
    selectedBeers ? (
      <CheckOut selectedBeers={selectedBeers} getTotalPrice={getTotalPrice}/>
    ) : null
  }
/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

