import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal, Tabs, Tab } from 'react-bootstrap';

function UploadModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title id="contained-modal-title-vcenter">
          <span className="headerText">Add Client</span>
          <br />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ImageUpload
          onHide={props.onHide}
          setShowPreview={props.setShowPreview}
          handleImageChange={props.handleImageChange}
        />
      </Modal.Body>
    </Modal>
  );
}

class ImageUpload extends Component {
  _handleSubmit = e => {
    e.preventDefault();
    this.props.onHide();
    this.props.setShowPreview(true);
  };

  onChangUrl = e => {
    this.props.handleImageChange(e.target.value);
  }

  onChange = e => {
    this.props.handleImageChange(e.target.files[0]);
    this.props.onHide();
    this.props.setShowPreview(true);
  };

  render() {
    return (
      <div>
        <form id="imageForm" onSubmit={this._handleSubmit}>
          <div className="uploadContainer">
            <i className="far fa-file-image fa-3x" />
            <br />
            <p className="desc">
              <span className="contentBold">Upload image</span>
              <br />
              Write down the link to your client to insert an image
            </p>
            <br />
            <Form.Control
              size="sm"
              type="url"
              name="urlFill"
              id="dataUrl"
              placeholder="http://example.com/"
              aria-describedby = "inputClientUrl"
              onChange = {this.onChangeUrl}
            />
            </div>
            <input
              style={{ display: 'none' }}
              type="file"
              name="file"
              id="addCustomLogo"
              aria-describedby="inputClientFile"
              onChange={this.onChange}
            />
            <label htmlFor="addCustomLogo" id="labelCustom">
              Add Custom Logo
            </label>
            <br />
            <Button
              id="addClient"
              variant="primary"
              type="submit"
              onClick={this._handleSubmit}
            >
            ADD CLIENT
          </Button>
        </form>
      </div>
    );
  }
}

function AddContent(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="btnContainer">
      <button
        className="trigger"
        id="addBtn"
        onClick={() => setModalShow(true)}
      >
        <div className="descUpload">
          <i className="fas fa-plus fa-5x" />
          <br />
          <span>Add</span>
        </div>
      </button>
      <UploadModal
        setShowPreview={props.setShowPreview}
        handleImageChange={props.handleImageChange}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

function App() {
  const [key, setKey] = useState('home');
  const [file, setFile] = useState('');
  const [showPreview, setShowPreview] = useState('');

  const handleImageChange = upload => {
    setFile(URL.createObjectURL(upload));
  };

  const tabs = [
    { eventKey: 'home', title: 'CLIENTS' },
    { eventKey: 'profile', title: 'FEATURED' },
    { eventKey: 'contact', title: 'PRESS' },
  ];

  return (
    <React.Fragment>
      <Tabs
        justify
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        {tabs.map(tab => (
          <Tab
            eventKey={tab.eventKey}
            key={tab.title}
            title={tab.title}
            id={tab.eventKey === 'home' ? 'clientsIcon' : ''}
          >
            <div className="threeTab">
              {showPreview && file &&  
                <div className = "clientPreview"> 
                  <img src={file} alt="preview"/>
                  <div className='textContent'>
                    <p>Insta Natural</p>
                    <p><i className='far fa-grin-alt'></i> Good</p>
                    <p>Sherly is fantastic! She is an absolute expert. </p>
                  </div>
                </div>
              }
              <AddContent
                setShowPreview={setShowPreview}
                handleImageChange={handleImageChange}
              />
              
            </div>
          </Tab>
        ))}
        
      </Tabs>
      
    </React.Fragment>
  );
}

export default App;
