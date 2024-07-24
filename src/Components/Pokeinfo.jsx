import React from "react";

const Pokeinfo = ({ data }) => {
   
    return (
        
        <>
        {/* Display Pokemon details if data is available */}
        {(!data) ? "" : (
                <>
                    {/* Pokemon name and image */}
                    <h1>{data.name}</h1>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                    
                    {/* Pokemon types */}                    
                    <div className="types">
                        <h2>Type :</h2>
                            {
                            data.types.map((type, index) => (
                                <div
                                    key={index} className="group" style={{ backgroundColor: getTypeColor(type.type.name) }}>
                                    <h2>{type.type.name}</h2>
                                </div>
                                ))
                            }
                    </div>

                    {/* Pokemon abilities */}
                    <div className="abilities">
                        <h2>Abilities :</h2>
                            {
                            data.abilities.map(poke=>{
                                return(
                                    <>
                                     <div className="group">
                                        <h2>{poke.ability.name}</h2>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    
                    {/* Pokemon stats */}
                    <div className="base-stat">
                        {
                            data.stats.map(poke=>{
                                return(

                                    <>
                                        <h3>{poke.stat.name}:{poke.base_stat}</h3>
                                    </>
                                )
                            })
                        }
                    </div>
                </>
            )
        }

        </>
    )
}

// Function to get color based on Pokemon type
const getTypeColor = (typeName) => {
    switch (typeName) {
      case "normal":
        return "#A8A77A"; 
      case "fire":
        return "#EE8130"; 
      case "water":
        return "#6390F0"; 
      case "electric":
        return "#F7D02C"; 
      case "grass":
        return "#7AC74C"; 
      case "ice":
        return "#96D9D6"; 
      case "fighting":
        return "#C22E28"; 
      case "poison":
        return "#A33EA1"; 
      case "ground":
        return "#E2BF65"; 
      case "flying":
        return "#A98FF3"; 
      case "psychic":
        return "#F95587"; 
      case "bug":
        return "#A6B91A"; 
      case "rock":
        return "#B6A136"; 
      case "ghost":
        return "#735797"; 
      case "dragon":
        return "#6F35FC";
      case "dark":
        return "#705746";
      case "steel":
        return "#B7B7CE";
      case "fairy":
        return "#D685AD";  
      default:
        return "#c0c0c0"; 
    }
  };

export default Pokeinfo