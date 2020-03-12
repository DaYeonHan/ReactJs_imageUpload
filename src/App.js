import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Form';

//get image from Add Custom Logo


function App() {

  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    // document.getElementById('file').click();
  }

  const toggleModal = () => setShowModal(!showModal)

  const handleChange = (e) => {
    readURL(e)
  }

  function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    debugger;
    reader.addEventListener(
      "load",
      function() {
        var avatarImg = new Image();
        var src = reader.result;
        avatarImg.src = src;
        console.log(src);
        avatarImg.onload = function() {
          var c = document.getElementById("myCanvas");
          var ctx = c.getContext("2d");
          ctx.canvas.width = avatarImg.width;
          ctx.canvas.height = avatarImg.height;
          
          ctx.drawImage(avatarImg, 0, 0);
        };
        toggleModal();
      },
      false
    );

    reader.readAsDataURL(input.files[0]);
  }
}

  return (
    <React.Fragment>
      <div className="btnContainer">
        <button className="trigger" id="addBtn" onClick={toggleModal}>
          <div className="descUpload">
            <i className="fas fa-plus fa-5x"></i>
            <br />
            <span>Add</span>
          </div>
        </button>
        <br />
        {/* <canvas id="myCanvas"></canvas> */}
      </div>
      {showModal && (
        <div className="overlay">
          <div className="modal-content">
            <div className="modalHeader">
              <span className="headerText">Add Client</span>
              <span className="close-button" onClick={toggleModal}>×</span>
              <br />
            </div>
            <div className="modalBody">
              <form>
                <div className="uploadContainer">
                  <i className="far fa-file-image fa-3x"></i>
                  <br />
                  <p className="desc"><span className="contentBold">Upload image</span><br />Write down the link to your client to insert an image</p>
                  <br />
                  <Form.Control size="sm" type="url" name="urlFill" id="dataUrl" placeholder="http://example.com/" />
                </div>
                <input style={{display: 'none'}} type="file" name="file" id="addCustomLogo" aria-describedby="inputClientUrl" onClick={handleClick()} onChange={handleChange}/>
                <label htmlFor="addCustomLogo" id="labelCustom">
                  Add Custom Logo
                </label>
                <br />
                <Button id="addClient" variant="primary" type="submit">
                  ADD CLIENT
                </Button>
              </form>
            </div>
        </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
