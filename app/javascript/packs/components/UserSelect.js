import React, { Component } from 'react';
import Async from 'react-select/async';
import { fetch } from './Fetch';
export default class UserSelect extends React.Component {
  state = {
     inputValue: '',
  }
   getOptionLabel = (option) => {
    return option.first_name+' '+option.last_name
  }
   getOptionValue = (option) => {
    return option.id
  }
   loadOptions = (inputValue) => {
    return fetch('GET', window.Routes.api_v1_users_path({q: { first_name_or_last_name_cont: inputValue }, format: 'json' }))
      .then(({data}) => {
        return data.items
      })
  }
   handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  }
   componentDidMount() {
    this.loadOptions();
  }
   render() {
    return (
      <div>
        <Async
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={this.props.isDisabled}
          defaultValue={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}