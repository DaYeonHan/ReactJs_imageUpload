import React, { useState, Component }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, 
  Form,
  Modal,
  Tabs,
  Tab
 } from 'react-bootstrap'

function UploadModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className ='modalHeader'>
        <Modal.Title id="contained-modal-title-vcenter">
          <span className="headerText">Add Client</span>
           <br />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImageUpload/>
      </Modal.Body>
    </Modal>
  );
}

class ImageUpload extends Component {

  state = {
      file: '',
      imagePreviewUrl: ''
  };

  _handleSubmit = e => {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log(this.state.file)
  }

  _handleImageChange = e =>{
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
          this.setState({ file: file, imagePreviewUrl: reader.result });
      }
      reader.readAsDataURL(file)
  }

  render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;

    return (
      <div>
      <form id='imageForm' onSubmit={this._handleSubmit}>
          <div className="uploadContainer">
            <i className="far fa-file-image fa-3x"></i>
            <br />
              <p className="desc"><span className="contentBold">Upload image</span><br />Write down the link to your client to insert an image</p>
            <br />
            <Form.Control size="sm" type="url" name="urlFill" id="dataUrl" placeholder="http://example.com/"/>
          </div>
          <input style={{display: 'none'}} type="file" name="file" id="addCustomLogo" aria-describedby="inputClientUrl" onChange={this._handleImageChange}/>
          <label htmlFor="addCustomLogo" id="labelCustom">
            Add Custom Logo
          </label>
          <br />
          {/* {!$imagePreview && <img src={imagePreviewUrl} />} */}
          <Button id="addClient" variant="primary" type="submit" onClick={this._handleSubmit}>
            ADD CLIENT
          </Button>
        </form>
      </div>
    )
  }
}


function AddContent(){
  const [modalShow, setModalShow] = React.useState(false);
  return(
    <div className="btnContainer">
      <button className="trigger" id="addBtn" onClick={() => setModalShow(true)}>
        <div className="descUpload">
          <i className="fas fa-plus fa-5x"></i>
          <br />
          <span>Add</span>
        </div>
      </button>
      <UploadModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

function App() {
  const [key, setKey] = useState('home');
  
  return (
    <React.Fragment>
      <Tabs justify id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="home" title="CLIENTS" id='clientsIcon'>
        <div className="threeTab">
          <AddContent/>
        </div>
      </Tab>
      <Tab eventKey="profile" title="FEATURED">
        <div className="threeTab">
          <AddContent/>
        </div>
      </Tab>
      <Tab eventKey="contact" title="PRESS">
        <div className="threeTab">
          <AddContent/>
        </div>
      </Tab>
    </Tabs>
    </React.Fragment>
  );
}

export default App;
