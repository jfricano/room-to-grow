import React, { useEffect, useState } from "react";

const PlantDetails = (props) => {
  const {
    gState,
    family,
    plant,
    plantDetails,
    setPlantDetails,
    setFavorites,
    favorites,
  } = props;

  useEffect(
    () => {
      if (gState.name === null || family === null || plant === null) return;
      console.log(plant);
      console.log(gState.slug);
      console.log(family);
      console.log(plant.scientific_name);
      fetch(`/location/${gState.slug}/${family}/${plant.scientific_name}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("plant details data: ", data);
          setPlantDetails(data);
        })
        .catch(() => console.log("oops"));
    },
    [plant]
    // FOR TESTING W/O BACKEND ONLY
    // () => {
    //   const obj = {
    //     detail1: 'green plant',
    //     detail2: 'edible'
    //   };
    //   setPlantDetails(obj);
    //   console.log('plantDeets', plantDetails);
    // },
    // [plant]
  );

  if (plantDetails === null) return <div></div>;
  else
    return (
      <div id="detailsContainer">
        <ul id="detailsList">
          <img className="detail-img" src={`${plantDetails.image_url}`}></img>
          <li className="details-element">
            <span className="details-field">Name:</span>{" "}
            {plantDetails.common_name}
          </li>
          <li className="details-element">
            <span className="details-field">Scientific Name:</span>{" "}
            {plantDetails.scientific_name}
          </li>
          <li className="details-element">
            <span className="details-field">Edible:</span>{" "}
            {`${plantDetails.edible}`}
          </li>
          <li className="details-element">
            <span className="details-field">Average Height:</span>{" "}
            {plantDetails.average_height}
          </li>
          <li className="details-element">
            <span className="details-field">Growth Habit:</span>{" "}
            {plantDetails.growth_habit}
          </li>
          <li className="details-element">
            <span className="details-field">Growth Rate:</span>{" "}
            {plantDetails.growth_rate}
          </li>
          <li>
            <form>
              <input
                id="notes-input"
                className="fav-input"
                type="text"
                name="notes"
                placeholder="Write notes here"
              ></input>
              <button
                className="fav-button"
                type="submit"
                onClick={
                  (e) => {
                    e.preventDefault();
                    const notes = document.getElementById("notes-input");
                    setFavorites([
                      ...favorites,
                      { name: plantDetails.common_name, notes: notes.value },
                    ]);
                  }
                }
              >
                Favorite
              </button>
            </form>
          </li>
        </ul>
      </div>
    );
};

export default PlantDetails;
