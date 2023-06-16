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
  const [beer, setBeer] = useState(null);  //for random beer
  const [showInfo, setShowInfo] = useState(false);//for more info button
  const [isSaved, setIsSaved] = useState(0);
  const [selectedBeers, setSelectedBeers] = useState([]); 
  const [allBeers,setAllBeers]=useState([]);
  const [filteredBeers,setFilteredBeers]=useState([]);
 


//for basket
    const getTotalPrice = (code) => {
      const price = selectedBeers.map((beer) => beer.price).reduce((a, b) => a + b, 0);
  
      if (code === null) {
        return Number(price).toFixed(2);
      } else if (code === 'BREW15') {
        return Number(price * 0.25).toFixed(2);
      } else if (code === 'BREW50') {
        return Number(price * 0.50).toFixed(2);
      }
    };
  

    //for BeerRandom
    const getRandomBeer = () => {
      fetch('https://api.punkapi.com/v2/beers/random')
        .then((res) => res.json())
        .then((data) => {
          const randomPrice = Number((Math.random() * (5 - 3) + 3).toFixed(2));
          const beerWithPrice = { ...data[0], price: randomPrice};
          setBeer(beerWithPrice);
        });
    };
    
    //for FilterBeer
    const getAllBeers = () => {
    const promises=[1,2].map((number)=>{
      return fetch(`https://api.punkapi.com/v2/beers?page=${number}&per_page=80`).then((res)=>res.json());
    });
    Promise.all(promises).then((data)=>{
      const combinedResponses=data.flat();
      const beersWithPrice=combinedResponses.map((beer)=>{
        const ramdomPrice=Number((Math.random()*(5-3)+3).toFixed(2));
        return { ...beer, price: ramdomPrice,showInfo:false};
      });
      setAllBeers( beersWithPrice );
      console.log('this is allBeers:', allBeers)
      // setIsSaved ( false )
      })};
    
    useEffect(() => {
      getRandomBeer();
      getAllBeers();
    }, []);
    // useEffect(()=>{
    //   setSelectedBeers()},removeBeer())

 

    const showMore = (beerId) => {
      setSelectedBeers((prevState) =>
        prevState.map((beer) => {
          if (beer.id === beerId) {
            return { ...beer, showInfo: !beer.showInfo };
          }
          return beer;
        })
      );
     
    };
  
    //save selected filtered beer
    const saveSelected = (beerId) => {
      const beerToSave = allBeers.find((beer) => beer.id === beerId);
      if (beerToSave) {
        setSelectedBeers([...selectedBeers, beerToSave]);
      }
    };
    
    
    
  
    const saveRandom = () => {
        setSelectedBeers((prevState) => [...prevState, beer]);
        // refactory below:
        setIsSaved(isSaved+=1);
      };
  

    // to remove items in basket, only remove one a time
    const removeBeer = (beerId) => {
      setSelectedBeers((prevState) => {
        const indexOfFirstDupBeer = prevState.findIndex((beer) => beer.id === beerId);
        if (indexOfFirstDupBeer !== -1) {
          const copyOfSelectedBeers = [...prevState];
          copyOfSelectedBeers.splice(indexOfFirstDupBeer, 1);
          setIsSaved(prevIsSaved => prevIsSaved - 1)
          return copyOfSelectedBeers;
        }
        return prevState;
      });
    }
    // .then(()=>{setSelectedBeers(selectedBeers=>selectedBeers)})
    
  
    const handleInput = (food) => {
      const filteredBeers = allBeers.filter((beer) =>
        beer.food_pairing.some((paired_food) => paired_food.toLowerCase().includes(food.toLowerCase()))
      );
  
      setFilteredBeers(filteredBeers);
    };
    // console.log('this is fltered beers',filteredBeers)
     // fix button for filtered beers


//for showing more info in filter beers
     const showFilteredBeer = (beerId) => {
      setFilteredBeers((prevState) =>
        prevState.map((beer) => {
          if (beer.id === beerId) {
            return { ...beer, showInfo: !beer.showInfo };
          }
          return beer;
        })
      );
    };
    




  
    return (
      <div className="App" style={{ backgroundImage: `url('./beer1.jpg')` }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home selectedBeers={selectedBeers} removeBeer={removeBeer} />} />
            <Route
              path="/randomBeer"
              element={
                <BeerRandom

                  beer={beer}
                  getBeer={getRandomBeer}
                  selectedBeers={selectedBeers}
                  isSaved={isSaved}
                  showInfo={showInfo}
                  saveRandom={saveRandom}
                />
              }
            />
            <Route
              path="/filterBeer"
              element={
                <FilterBeer
                showFilteredBeer={showFilteredBeer}
                  allBeers={allBeers}
                  handleInput={handleInput}
                  filteredBeers={filteredBeers}
                  showMore={showMore}
                  saveSelected={saveSelected}
                  showInfo={showInfo}
                  isSaved={isSaved}
                  beer={beer}
                />
              }
            />
            <Route
              path="/basket"
              element={selectedBeers.length>0 ? <WishList selectedBeers={selectedBeers} removeBeer={removeBeer} showMore={showMore} showInfo={showInfo} /> : null}
            />
            <Route
              path="/checkout"
              element={selectedBeers ? <CheckOut selectedBeers={selectedBeers} getTotalPrice={getTotalPrice} /> : null}
            />
          </Routes>
        </Router>
      </div>
    );
  }
  
  export default App;

//below code is used when api is restricted.
// const getAllBeers=()=>{
//   setAllBeers([
//       {
//         "id": 84,
//         "name": "Stout Supreme",
//         "description": "A rich and velvety stout with notes of chocolate and coffee.",
//         "food_pairing": [
//           "Grilled steak",
//           "Dark chocolate cake",
//           "Vanilla ice cream"
//         ],
//         "abv": 7.5,
//         "image_url": "https://images.punkapi.com/v2/84.png",
//         "price": 7.99
//       },
//       {
//         "id": 85,
//         "name": "Hoppy IPA",
//         "description": "An intense IPA with a strong hop aroma and citrusy flavors.",
//         "food_pairing": [
//           "Spicy Thai curry",
//           "Grilled pineapple",
//           "Ginger cookies"
//         ],
//         "abv": 6.8,
//         "image_url": "https://images.punkapi.com/v2/85.png",
//         "price": 5.99
//       },
//       {
//         "id": 86,
//         "name": "Wheat Ale",
//         "description": "A refreshing wheat ale with hints of banana and clove.",
//         "food_pairing": [
//           "Grilled fish tacos",
//           "Fruit salad",
//           "Lemon meringue pie"
//         ],
//         "abv": 5.2,
//         "image_url": "https://images.punkapi.com/v2/86.png",
//         "price": 6.49
//       },
//       {
//         "id": 81,
//         "name": "India Session Lager - Prototype Challenge",
//         "description": "A refreshing and hoppy session lager with a crisp taste.",
//         "food_pairing": [
//           "Tomato and onion palmiers",
//           "Bratwurst with sauerkraut",
//           "Lemon drizzle cake"
//         ],
//         "abv": 4.4,
//         "image_url": "https://images.punkapi.com/v2/keg.png",
//         "price": 4.99
//       },
//       {
//         "id": 83,
//         "name": "American Pale Ale",
//         "description": "A classic American-style pale ale with a citrusy hop aroma.",
//         "food_pairing": [
//           "Spicy grilled chicken wings",
//           "Barbecue ribs",
//           "Citrus fish"
//         ],
//         "abv": 5.6,
//         "image_url": "https://images.punkapi.com/v2/keg.png",
//         "price": 5.49
//       },
//       {
//         "id": 82,
//         "name": "Pilsen Lager",
//         "description": "A traditional European-style pilsner with a clean and crisp flavor.",
//         "food_pairing": [
//           "Grilled shrimp skewers",
//           "lamb schnitzel",
//           "Cheesecake with fruit topping"
//         ],
//         "abv": 6.3,
//         "image_url": "https://images.punkapi.com/v2/2.png",
//         "price": 6.99
//       }
//     ]);}