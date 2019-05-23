import React, { useState, useEffect } from "react";
import Meme from "./Meme";
import Clipboard from "clipboard";
function FinishedMeme({ newImg, onReset, template, handleClick }, props) {
  const [resetMeme, setResetBool] = useState(false);
  const [copyBtnClicked, toggleClickedText] = useState(false);
  useEffect(() => {
    const clipboard = new Clipboard(".copy-to-clipboard");
    return () => {
      clipboard.destroy();
    };
  }, []);
  if (resetMeme === true) {
    return <Meme template={template} handleReset={onReset} />;
  }
  return (
    <React.Fragment>
      <h1 className='heading'>
        Thanks for making a meme and being awesome{" "}
        <span role='img' aria-label='emoji'>
          🤠
        </span>
      </h1>
      <div className='column'>
        <div className='row'>
          <button className='reset' onClick={() => setResetBool(true)}>
            Reset this meme
          </button>
          <button className='go-back' onClick={onReset}>
            Go back home
          </button>
        </div>
        <img
          className='template-meme'
          src={newImg}
          style={{ margin: "0 auto" }}
          alt='Finished meme  for user'
        />
        <span>
          <h1 className='heading'>
            Now go copy this link and make someone laugh{" "}
            <span role='img' aria-label='emoji'>
              🤣
            </span>
          </h1>
          <div style={{ marginBottom: "10px" }}>
            {" "}
            <span role='img' aria-label='emoji'>
              👇
            </span>
          </div>
          {!copyBtnClicked ? (
            <button
              className='copy copy-to-clipboard'
              data-clipboard-text={newImg}
              onClick={() => toggleClickedText(true)}
            >
              <span role='img' aria-label='emoji'>
                👋
              </span>
            </button>
          ) : (
            <div>Link copied to clipboard!</div>
          )}
        </span>
      </div>
    </React.Fragment>
  );
}
export default FinishedMeme;
