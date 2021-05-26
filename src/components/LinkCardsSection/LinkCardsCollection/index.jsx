
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

import './index.scss';

import LinkCard from './LinkCard';

import { selectAllLinks } from "../../../store/links"


const MAX_MEDIUM_CARDS = 8;
// NOTE: this value is just an average width of the BIG_SIZE_CARD,
// since the actual width is dynamic (never the same).
const AVERAGE_BIG_SIZE_CARD_WIDTH = 330;
const MEDIUM_SIZE_CARD_HORIZONTAL_MARGIN = 40;
// NOTE: make sure to update the scss variable ($link-medium-card-width)
// if you change (AVERAGE_MEDIUM_SIZE_CARD_WIDTH)
const AVERAGE_MEDIUM_SIZE_CARD_WIDTH = 240 + MEDIUM_SIZE_CARD_HORIZONTAL_MARGIN;

const FIRST_ROW_KEY = 'FIRST_ROW';
const SECOND_ROW_KEY = 'SECOND_ROW';
const THIRD_ROW_KEY = 'THIRD_ROW';

const EMPTY_CARDS_DISTRIBUTION = {
  [FIRST_ROW_KEY]: {
    rowCards: [],
    sizeKey: 'BIG',
    containerClass: 'Big-cards-container',
  },
  [SECOND_ROW_KEY]:{
    rowCards: [],
    sizeKey: 'MEDIUM',
    containerClass: 'Medium-cards-container',
    visibleCards: 0,
  },
  [THIRD_ROW_KEY]:{
    rowCards: [],
    sizeKey: 'SMALL',
    containerClass: 'Small-cards-container',
  },
};

// Distribute/Split all cards between the 3 rows of the section.
// NOTE: It is assumed that the (allLinksData) array is given already
// sorted by the counter field (from biggest to smallest, being the 
// first element of the array the one with the biggest counter value).
function distributeCardsPerRow(allLinksData, maxBigCardsAmount, maxMediumCardsAmount) {
  // Clone all links-data to safely manipulate it's data.
  let remainingCards = [...allLinksData];
  // Pre-fill (and structurate) output dictionary with empty dictionary.
  let newCardsDistribution = {...EMPTY_CARDS_DISTRIBUTION};
// 1stRow: (rowCards) array are the first (maxBigCardsAmount) elements of the array
  // NOTE: the (splice) operation not only returns the selected elements 
  // of the array, but is also removes those elements from the array.
  newCardsDistribution[FIRST_ROW_KEY].rowCards = remainingCards.splice(0, maxBigCardsAmount);
// 2ndRow (carrousel): cards array are the next (MAX_MEDIUM_CARDS) 
  // elements of the array. 
  // Additionally, the (visibleCards) field is set to keep track of
  // how many (rowCards) will be visible inside the cards-carrousel.
  const newCards2ndRow = newCardsDistribution[SECOND_ROW_KEY];
  newCards2ndRow.rowCards = remainingCards.splice(0, MAX_MEDIUM_CARDS);
  if(newCards2ndRow.rowCards.length < maxMediumCardsAmount) {
    newCards2ndRow.visibleCards = newCards2ndRow.rowCards.length;
  } else {
    newCards2ndRow.visibleCards = maxMediumCardsAmount;
  }
// 3rdRow: (rowCards) array are all the remaning elements 
  // (after deleting the elements of the 1st and 2nd row).
  newCardsDistribution[THIRD_ROW_KEY].rowCards = remainingCards;

  return newCardsDistribution;
}

// Render all the link-cards of the row. The type of card
// (big, medium or small) is picked using by the (sizeKey) prop.
const LinkCardsRow = ({ rowCards, sizeKey, handleCopySnackbar }) => (
  rowCards.map(({ title, image, short_url, tags }, index) => (
    <LinkCard
      // Create unique key (in case 2 equal urls are given) 
      key={`${index}-${short_url}`}
      title={title}
      image={image}
      short_url={short_url}
      tags={tags}
      size={sizeKey}
      handleCopySnackbar={handleCopySnackbar}
    />
  ))  
);

const LinkCardsCollection = ({
  handleCopySnackbar,
  linksContainerWidth
}) => {
  const links = useSelector(selectAllLinks);

  const [distributedCards, setDistributedCards] = useState(EMPTY_CARDS_DISTRIBUTION);
  const [prevMaxBigCardsAmount, setPrevMaxBigCardsAmount] = useState(1);
  const [prevMaxMediumCardsAmount, setPrevMaxMediumCardsAmount] = useState(1);
  const [firstCarrouselCardIndex, setFirstCarrouselCardIndex] = useState(null);
  const [lastCarrouselCardIndex, setLastCarrouselCardIndex] = useState(null);

  // Redistribute the cards per row everytime either the max amount of big/medium 
  // cards changed, or after the (links) array itself changed.
  useEffect(() => {
    const newCardsDistribution = distributeCardsPerRow(links, prevMaxBigCardsAmount, prevMaxMediumCardsAmount);
    setDistributedCards(newCardsDistribution);
    const { visibleCards } = newCardsDistribution[SECOND_ROW_KEY];
    setFirstCarrouselCardIndex(1);
    setLastCarrouselCardIndex(visibleCards);
  }, 
    [links, prevMaxBigCardsAmount, prevMaxMediumCardsAmount,
    setDistributedCards, setFirstCarrouselCardIndex, setLastCarrouselCardIndex]
  );  

  // Everytime the value of (linksContainerWidth) changes, update the 
  // max amount of big/medium cards that fit inside the container.
  useEffect(() => {
    // Calculate the max amount of big- and medium-cards that fit in the container
    // The minimum amount of cards to fit is 1.
    const newMaxBigCardsAmount = Math.floor(linksContainerWidth / AVERAGE_BIG_SIZE_CARD_WIDTH) || 1;
    const newMaxMediumCardsAmount = Math.floor(linksContainerWidth / AVERAGE_MEDIUM_SIZE_CARD_WIDTH) || 1;
    // Check if max amount values changed
    const maxBigCardsAmountChanged = newMaxBigCardsAmount && (prevMaxBigCardsAmount !== newMaxBigCardsAmount);
    const maxMediumCardsAmountChanged = newMaxMediumCardsAmount && (prevMaxMediumCardsAmount !== newMaxMediumCardsAmount);
    // Update the values (only if either of them changed)
    maxBigCardsAmountChanged && setPrevMaxBigCardsAmount(newMaxBigCardsAmount);
    maxMediumCardsAmountChanged && setPrevMaxMediumCardsAmount(newMaxMediumCardsAmount);
  }, 
    [linksContainerWidth, prevMaxBigCardsAmount, prevMaxMediumCardsAmount, 
    setPrevMaxBigCardsAmount, setPrevMaxMediumCardsAmount]
  );

  // Update the index of the first and last carrousel-cards
  // after pressing the left or right carrousel navigation button.
  const moveCarrouselLeft = () => {
    setFirstCarrouselCardIndex(firstCarrouselCardIndex-1);
    setLastCarrouselCardIndex(lastCarrouselCardIndex-1);
  }
  const moveCarrouselRight = () => {
    setFirstCarrouselCardIndex(firstCarrouselCardIndex+1);
    setLastCarrouselCardIndex(lastCarrouselCardIndex+1);
  }

  const renderLinkCardsRowByKey = (rowKey) => {
    const { rowCards, sizeKey, containerClass, visibleCards } = distributedCards[rowKey];

    if (rowKey === SECOND_ROW_KEY) {
      // Conditions to show carrousel navigation-buttons
      const shouldShowLeftCarrouselButton = !!firstCarrouselCardIndex && firstCarrouselCardIndex!==1;
      const shouldShowRightCarrouselButton = !!lastCarrouselCardIndex && lastCarrouselCardIndex!==rowCards.length;
      // Set values of dynamic in-line carrousel style-properties
      const carrouselDynamicWidth = AVERAGE_MEDIUM_SIZE_CARD_WIDTH * (visibleCards||0);
        // (HorizontalOffset) causes the navigation-like effect when clicking
        // the right and left carrousel buttons.
      const carrouselDynamicHorizontalOffset = AVERAGE_MEDIUM_SIZE_CARD_WIDTH * (firstCarrouselCardIndex-1);
      return (
        <div className={containerClass}>
          {shouldShowLeftCarrouselButton && <IconButton 
            className="Navigate-left-button"
            onClick={moveCarrouselLeft}
          >
            <NavigateBefore className="Navigate-left-icon darken-on-hover"/>
          </IconButton>}   
          <div className="Cards-carrousel-container">
            <div 
              className="Cards-carrousel"
              style={{ 
                width: carrouselDynamicWidth,
                transform: `translateX(-${carrouselDynamicHorizontalOffset}px)`
              }}
            >
              <LinkCardsRow
                rowCards={rowCards}
                sizeKey={sizeKey}
                handleCopySnackbar={handleCopySnackbar}
              />
            </div>          
          </div>
          {shouldShowRightCarrouselButton && <IconButton 
            className="Navigate-right-button"
            onClick={moveCarrouselRight}
          >
            <NavigateNext className="Navigate-right-icon darken-on-hover"/>
          </IconButton>}          
        </div>
      );
    }
    // 1st of 3rd rows require the same components.
    return (
      <div className={containerClass}>
        <LinkCardsRow
          rowCards={rowCards}
          sizeKey={sizeKey}
          handleCopySnackbar={handleCopySnackbar}
        />
      </div>      
    )
  }
  
  return (
    <>
      {renderLinkCardsRowByKey(FIRST_ROW_KEY)}
      {renderLinkCardsRowByKey(SECOND_ROW_KEY)}
      {renderLinkCardsRowByKey(THIRD_ROW_KEY)}
    </>
  );
}

export default LinkCardsCollection;
