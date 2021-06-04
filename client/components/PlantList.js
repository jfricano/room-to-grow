import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

const PlantList = (props) => {
  const { family, gState, setPlant } = props;
  const [plantList, setPlantList] = useState(null);

  useEffect(() => {
    if (gState.name === null || family === null) return;
    fetch(`/location/${gState.slug}/${family}`)
      .then((response) => response.json())
      .then((data) => {
        setPlantList(data.plants);
        setPlantDetails(null);
      })
      .catch((err) => console.log("oops", err));
  }, [family]);

  if (family === null || plantList === null) return <div></div>;
  else
    return (
      <ul id="plantList">
        {plantList.map((plant, index) => {
          return (
            <li key={index}>
              <img src={plant.image_url} width="40px" height="40px"></img>
              <button className="list-buttons" onClick={() => setPlant(plant)}>
                {plant.common_name}
              </button>
            </li>
          );
        })}
      </ul>
    );
};

export default PlantList;
