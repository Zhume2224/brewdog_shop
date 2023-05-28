import React, { useState } from 'react';

const Buttons = ({ beer, showMore, saveSelected, showInfo, isSaved }) => {
  const [buttonSaveText, setButtonSaveText] = useState(isSaved ? 'Saved' : 'Save');
  const [buttonInfoText, setButtonInfoText] = useState(showInfo ? 'Hide Info' : 'More Info');

  const handleSave = () => {
    saveSelected();
    setButtonSaveText(prevText => prevText === 'Save' ? 'Saved' : 'Save');
  };

  const handleInfoButton = () => {
    showMore();
    setButtonInfoText(prevText => prevText === 'More Info' ? 'Hide Info' : 'More Info');
  };

  return (
    <>
      <button className="beer-info" onClick={handleInfoButton}>
        {buttonInfoText}
      </button>
      <button className="beer-save" onClick={handleSave}>
        {buttonSaveText}
      </button>
    </>
  );
};

export default Buttons;
