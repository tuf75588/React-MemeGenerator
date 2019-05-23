import React, { useState, useEffect } from "react";
import MemeList from "./components/MemeList";
import Meme from "./components/Meme";

function App() {
  const [templates, getTemplates] = useState([]);
  const [template, getTemplate] = useState(null);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then(({ data: { memes } }) => getTemplates(memes));
  }, [templates]);

  return (
    <div style={{ textAlign: "center" }} className='container'>
      {!template && <MemeList list={templates} handleClick={getTemplate} />}
      {template && (
        <Meme
          template={template}
          handleReset={() => getTemplate(null)}
          handleClick={() => getTemplate(template)}
        />
      )}
    </div>
  );
}

export default App;
