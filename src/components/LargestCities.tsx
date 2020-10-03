import React from 'react';
import { Link } from 'react-router-dom';

interface LargestCitiesProps {
  cities: Array<any>,
  onRemoveItem: Function
}

const LargestCities = (props: any) => {
  const { cities, onRemoveItem } = props;

  if (!cities) return null;

  return <ol>
    {cities.map((city: any) => {
      const { data } = city;
      return <li key={data.name}>
        <Link to={`/${data.name}/details`}> {data.name}</Link>{Math.floor(data.main.temp)}&#8451;
        <button onClick={() => onRemoveItem(data)}>Remove</button>
        </li>
    })}
    </ol>
}

export default LargestCities;