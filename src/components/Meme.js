import React, { useState } from "react";
import FinishedMeme from "./FinishedMeme";
import loader from "../utils/loader.svg";
function Meme({ template, handleReset, handleClick }) {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [memeUrl, getMemeURL] = useState(null);
  const [isLoading, setLoading] = useState(false);

  function validate() {
    return (
      topText.length > 0 &&
      topText.length <= 25 &&
      bottomText.length > 0 &&
      bottomText.length <= 25
    );
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const params = {
      template_id: template.id,
      username: "atd285",
      password: "Rosiedog1",
      text0: topText,
      text1: bottomText
    };
    const url = `https://api.imgflip.com/caption_image?template_id=${
      params.template_id
    }&username=${params.username}&password=${params.password}&text0=${
      params.text0
    }&text1=${params.text1}`;
    const request = await fetch(url);
    const response = await request.json();

    setTimeout(() => {
      getMemeURL(response.data.url);
      setLoading(false);
    }, 3000);
  }
  console.log(template);
  return (
    <React.Fragment>
      {!memeUrl && !isLoading && (
        <React.Fragment>
          <h1 style={{ fontWeight: 100, color: "#fff" }}>
            Be your most creative self and add some text!
          </h1>
          <img
            key={template.id}
            src={template.url}
            alt={template.name}
            className='template-meme'
          />
          <form onSubmit={handleSubmit}>
            <div className='input-container'>
              <input
                type='text'
                placeholder='line one'
                onChange={(e) => setTopText(e.target.value)}
              />
              <input
                type='text'
                placeholder='line two'
                onChange={(e) => setBottomText(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='btn btn-submit'
              disabled={!validate()}
            >
              Create Meme
            </button>
            <p style={{ textAlign: "center" }}>(fields cannot be blank)</p>
          </form>
          <div className='divider' />
          <h3 className='back-section'>
            Change your mind? No problem. Click{" "}
            <strong onClick={handleReset}>Here</strong> to go back.
          </h3>
        </React.Fragment>
      )}
      {isLoading && <img src={loader} alt='loading-svg' className='spinner' />}
      {memeUrl && !isLoading && (
        <FinishedMeme
          newImg={memeUrl}
          onReset={handleReset}
          template={template}
          handleClick={handleClick}
        />
      )}
    </React.Fragment>
  );
}
export default Meme;
