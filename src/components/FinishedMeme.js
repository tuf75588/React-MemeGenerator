import React from "react";

function FinishedMeme({ newImg }) {
  return (
    <React.Fragment>
      <h1 className='heading'>Thanks for making a meme and being awesome 🤠</h1>
      <div className='column'>
        <div className='row'>
          <button>Reset this meme</button>
          <button>Go back home</button>
        </div>
        <img
          className='template-meme'
          src={newImg}
          style={{ margin: "0 auto" }}
        />
        <span>
          <h1 className='heading'>
            Now go copy this link and make someone laugh 🤣
          </h1>
          <div style={{ marginBottom: "10px" }}>👇</div>
          <button className='copy'>👋</button>
        </span>
      </div>
    </React.Fragment>
  );
}
export default FinishedMeme;
