import React from 'react';
import { Modal, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { fetch } from './Fetch';
import UserSelect from './UserSelect';

export default class EditPopup extends React.Component {
  state = {
    task: {
      id: null,
      name: '',
      description: '',
      state: null,
      author: {
        id: null,
        first_name: null,
        last_name: null,
        email: null
      },
      assignee: {
        id: null,
        first_name: null,
        last_name:  null,
        email: null
      }
    },
    isLoading: true,
  }

  loadCard = (cardId) => {
    this.setState({ isLoading: true });
    fetch('GET', window.Routes.api_v1_task_path(cardId, {format: 'json'})).then(({data}) => {
      this.setState({ task: data});
      this.setState({ isLoading: false });
    });
  }

  componentDidUpdate (prevProps) {
    if (this.props.cardId != null && this.props.cardId !== prevProps.cardId) {
      this.loadCard(this.props.cardId);
    };
  }

  handleNameChange = (e) => {
    this.setState({ task: { ...this.state.task, name: e.target.value }});
  }

  handleDecriptionChange = (e) => {
    this.setState({ task: { ...this.state.task, description: e.target.value }});
  }

  handleCardEdit = () => {
    const { task } = this.state;
    const { name, description, author, assignee, state } = task;
    fetch('PUT', window.Routes.api_v1_task_path(this.props.cardId, {format: 'json'}), {
      name,
      description,
      author_id: this.state.task.author.id,
      assignee_id: this.state.task.assignee.id,
      state
    }).then( response => {
      if (response.statusText == 'OK') {
        this.props.onClose(state);
      }
      else {
        alert('Update failed! ' + response.status + ' - ' + response.statusText);
      }
    });
  }

  handleCardDelete = () => {
    fetch('DELETE', window.Routes.api_v1_task_path(this.props.cardId, { format: 'json' }))
      .then( response => {
        if (response.statusText == 'OK') {
          this.props.onClose(this.state.task.state);
        }
        else {
          alert('DELETE failed! ' + response.status + ' - ' + response.statusText);
        }
      });
  }

  handleAuthorChange = (value) => {
    this.setState({ task: { ...this.state.task, author: value }});
  }

  handleAssigneeChange = (value) => {
    this.setState({ task: { ...this.state.task, assignee: value }});
  }

  render () {
    const { task } = this.state;
    if (this.state.isLoading) {
      return (
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Info
            </Modal.Title>
          </Modal.Header>
           <Modal.Body>
            Your task is loading. Please be patient.
          </Modal.Body>
           <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {task.id} [{task.state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <FormLabel>Task name:</FormLabel>
                <FormControl
                  type="text"
                  value={this.state.task.name}
                  placeholder='Set the name for the task'
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <FormLabel>Task description:</FormLabel>
                <FormControl
                  type="textarea"
                  value={task.description}
                  placeholder='Set the description for the task'
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
            </form>
            Author: {task.author.first_name} {task.author.last_name}
          </Modal.Body>
          <UserSelect
            id="Author"
            disabled="true"
            value={this.state.task.author}
            onChange={this.handleAuthorChange}
          />
          <UserSelect
            id="Assignee"
            onChange={this.handleAssigneeChange}
            value={task.assignee}
          />
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCardDelete}>Delete</Button>
            <Button onClick={this.props.onClose}>Close</Button>
            <Button variant="primary" onClick={this.handleCardEdit}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}