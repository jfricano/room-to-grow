import React, { useEffect, useState } from "react";

const FamilyList = (props) => {
  const { gState, setGState, setFamily, setPlant, setPlantDetails } = props;
  const [familiesData, setFamiliesData] = useState(null);

  // families receives object
  // first k-v pair
  // have to get the slug and pass back to backend with the family name
  // similalry with plants, will receive slug and family name
  useEffect(() => {
    if (gState.name === null) return;

    fetch(`/location/${gState.name}`)
      .then((response) => response.json())
      .then((data) => {
        setFamiliesData(data.families);
        setGState({ name: gState.name, slug: data.slug });
      })
      .catch(() => console.log("oops"));
  }, [gState.name]);

  if (familiesData === null) return <div></div>;
  else
    return (
      <ul id="familyList">
        {familiesData.map((family, index) => {
          return (
            <li key={index}>
              <button
                className="list-buttons"
                onClick={() => {
                  setFamily(family);
                  setPlant(null);
                  setPlantDetails(null);
                }}
              >
                {family}
              </button>
            </li>
          );
        })}
      </ul>
    );
};

export default FamilyList;
