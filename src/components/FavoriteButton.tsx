import React from 'react';


interface FavoriteProps {
  city: any,
  favoritesMap: any,
  onFavoriteClick: Function
}

const FavoriteButton = (props: FavoriteProps) => {
  const { favoritesMap, city, onFavoriteClick } = props;

  let iconName = 'fa-heart-o';
  let color = '#000';
  
  if (favoritesMap[city.name]) {
    iconName = 'fa-heart';
    color = '#ec6e4d';
  }
  
  return (
    <button
      className="app-button"
      onClick={() => onFavoriteClick({ data: city })}
      style={{color}}
    >
      <i className={`fa ${iconName}`} aria-hidden="true"></i>
    </button>
  )

};


export default FavoriteButton