import React from 'react';
import { Modal, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { fetch } from './Fetch';
import UserSelect from './UserSelect';

export default class AddPopup extends React.Component {
  state = {
    name: '',
    description: '',
    assignee: {
      id: null,
      first_name: null,
      last_name:  null,
      email: null
    }
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleDecriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleCardAdd = () => {
    const { name, description, assignee } = this.state;
    fetch('POST', window.Routes.api_v1_tasks_path(), {
      task: {
        name,
        description,
        assignee_id: assignee.id
      }
    }).then( response => {
    if (response.statusText == 'Created') {
        this.props.onClose(true);
      }
      else {
        alert(response.status + ' - ' + response.statusText);
      }
    });
  }

  handleAssigneeChange = (value) => {
    this.setState({ assignee: value });
  }


  render () {
    return <div>
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            New task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup controlId="formTaskName">
              <FormLabel>Task name:</FormLabel>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder='Set the name for the task'
                onChange={this.handleNameChange}
              />
            </FormGroup>
            <FormGroup controlId="formDescriptionName">
              <FormLabel>Task description:</FormLabel>
              <FormControl
                type="textarea"
                value={this.state.description}
                placeholder='Set the description for the task'
                onChange={this.handleDecriptionChange}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <UserSelect
          id="Assignee"
          onChange={this.handleAssigneeChange}
          value={this.state.assignee}
        />

        <Modal.Footer>
          <Button onClick={this.props.onClose}>Close</Button>
          <Button variant="primary" onClick={this.handleCardAdd}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
}