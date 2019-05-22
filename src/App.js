import React from "react";
import { Meme } from "./components/Meme";

function App() {
  function onlyTwoBoxCount({ box_count }) {
    return box_count <= 2;
  }
  const [templates, setTemplates] = React.useState([]);
  const [template, setTemplate] = React.useState(null);
  const [topText, setTopText] = React.useState("");
  const [bottomText, setBottomText] = React.useState("");
  const [memeUrl, getMemURL] = React.useState(null);
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((data) => {
        return data.json();
      })
      .then(({ data: { memes } }) => {
        setTemplates(memes);
      });
  }, []);

  const inputCount = template ? Array(template.box_count).fill() : "";

  return (
    <div style={{ textAlign: "center" }} className='container'>
      {template && (
        <React.Fragment>
          <h1>Be your most creative self and add some text!</h1>
          <Meme template={template} />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const params = {
                template_id: template.id,
                username: "atd285",
                password: "Rosiedog1",
                text0: topText,
                text1: bottomText
              };
              let url = `https://api.imgflip.com/caption_image?template_id=${
                params.template_id
              }&username=${params.username}&password=${params.password}&text0=${
                params.text0
              }&text1=${params.text1}`;
              const request = await fetch(url);
              const response = await request.json();
              getMemURL(response.data.url);
              //post request to generate meme image.
            }}
          >
            <input
              type='text'
              placeholder='meme text'
              onChange={(e) => setTopText(e.target.value)}
            />
            <input
              type='text'
              placeholder='meme text'
              onChange={(e) => setBottomText(e.target.value)}
            />
            <button type='submit'>Create meme</button>
          </form>
          {inputCount}
          {memeUrl && <h1>Here's your meme, hot off the press! {memeUrl}</h1>}
        </React.Fragment>
      )}
      {!template && (
        <React.Fragment>
          <h1 style={{ fontWeight: 100 }}>Please pick a meme template</h1>
          {templates.filter(onlyTwoBoxCount).map((template) => (
            <Meme
              template={template}
              key={template.url}
              onClick={() => setTemplate(template)}
            />
          ))}
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
