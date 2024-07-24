import { useState, useMemo } from "react";
import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useEffect } from "react";


const Main=()=>{
  // State variables for managing Pokemon data, loading state, API URLs, selected Pokemon, search term, and filtered Pokemon data
    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]=useState();
    const [prevUrl,setPrevUrl]=useState();
    const [pokeDex,setPokeDex]=useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPokeData, setFilteredPokeData] = useState([]);

  // Function to fetch Pokemon data from the API
    const pokeFun=async()=>{
        setLoading(true)
        const res=await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }

    const getPokemon=async(res)=>{
       res.map(async(item)=>{
          const result=await axios.get(item.url)
          setPokeData(state=>{
              state=[...state,result.data]
              state.sort((a,b)=>a.id>b.id?1:-1)
              return state;
          })
       })   
    }

    useEffect(()=>{
        pokeFun();
    },[url])

    // useEffect hook to filter Pokemon data based on the search term
    useEffect(() => {

    const filteredData = pokeData.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
      setFilteredPokeData(filteredData);
      }, [searchTerm, pokeData]);

  // Function to handle search button click
  const handleSearch = () => {
  };

    return (

        <>
            {/* Header section */}            
            <header className="header">
              <a href="#" className="logo">
                Pokédex
              </a>
              <nav className="navbar">
                <a href="#">Home</a>
                <a href="#">Collection</a>
                <a href="#">Login</a>
              </nav>
            </header>
            {/* End header section */}  

            {/* Main title section */}
            <div className="maintitle">
                <div className="container">
                    <h1>Welcome To Pokédex!</h1>
                    <h3>Let's Find Your Favourite Pokemon!</h3>
                </div>
            </div>
            {/* End main title section */}

            {/* Search bar section */}
            <div className="search-bar">
              <input type="text" placeholder="Search Your Pokemon Here..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              <button onClick={handleSearch}>GO</button>
            </div>
            {/* End search bar section */}

            {/* Container for left and right content (Pokeinfo and Card components) */}
            <div className="container-both">

                {/* Right content (Pokeinfo) */}
                <div className="right-content">
                   <Pokeinfo data={pokeDex}/>
                </div>

                {/* Left content (Card component and navigation buttons) */}
                <div className="left-content">
                    <Card pokemon={filteredPokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
        
                    {/* Navigation buttons */}                   
                    <div className="btn-group">
                        {  prevUrl && <button onClick={()=>{
                            setPokeData([])
                           setUrl(prevUrl) 
                        }}>Previous</button>}

                        { nextUrl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;