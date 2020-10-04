import React from 'react';


interface FavoriteProps {
  city: any,
  favoritesMap: any,
  onFavoriteClick: Function
}

const FavoriteButton = (props: FavoriteProps) => {
  const { favoritesMap, city, onFavoriteClick } = props;

  let iconName = 'fa-heart-o';
  if (favoritesMap[city.name]) {
    iconName = 'fa-heart';
  }
  
  return (
    <button onClick={() => onFavoriteClick(city)}>
      <i className={`fa ${iconName}`} aria-hidden="true"></i>
    </button>
  )

};


export default FavoriteButton