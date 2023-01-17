import React from 'react';
import { FaStar } from 'react-icons/fa';

function Rating({ rating }) {
    console.log(rating);
  // Calculate the number of full stars and half stars
  const ratingDiv = rating/2;
  const fullStars = Math.floor(ratingDiv);
  const halfStars = ratingDiv - fullStars >= 0.5 ? 1 : 0;

  // Create an array of full stars
  const fullStarElements = Array.from({ length: fullStars }, (_, i) => (
    <FaStar key={i} />
  ));

  // Create an array of half stars
  const halfStarElements = Array.from({ length: halfStars }, (_, i) => (
    <FaStar key={i} className="half" />
  ));

  // Create an array of empty stars
  const emptyStarElements = Array.from({ length: 5 - fullStars - halfStars }, (_, i) => (
    <FaStar key={i} className="empty" />
  ));

  return (
    <div className="rating">
      {[...fullStarElements, ...halfStarElements, ...emptyStarElements]}
    </div>
  );
}

export default Rating;
