import React from "react";
import { onlyTwoBoxes } from "../utils/helpers";
function MemeList({ list, handleClick }) {
  return (
    <React.Fragment>
      <h1 style={{ fontWeight: 100, color: "#fff" }}>
        Please select a template
      </h1>
      <div className='list-container'>
        {list.length === 0 ? (
          <h1>Loading memes, hang tight</h1>
        ) : (
          list.filter(onlyTwoBoxes).map((template) => (
            <div
              className='card'
              key={template.name}
              onClick={() => handleClick(template)}
            >
              <div className='meme-title'>{template.name}</div>
              <img src={template.url} alt={`${template.name}`} />
            </div>
          ))
        )}
      </div>
    </React.Fragment>
  );
}
export default MemeList;
