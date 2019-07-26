/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { create } from '../../services/questionsService';

class AddQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      text: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.submit();
  }

  async submit() {
    this.setState({
      disabled: true
    });

    await this.props.createQuestion({ text: this.state.text });
    this.setState({
      disabled: false,
      text: ''
    });

    this.props.onSubmit();
  }

  render() {
    return (
      <div className="col-sm-12">
        <form onSubmit={this.handleSubmit}>
          <div className="d-flex align-items-center form-group">
            <label htmlFor="text" className="text-primary mb-0 mr-3">
              Question:
            </label>
            <input
              disabled={this.state.disabled}
              type="text"
              name="text"
              id="text"
              className="form-control mr-3"
              value={this.state.text}
              onChange={this.handleInputChange}
            />
            <button type="submit" disabled={this.state.disabled} className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    question: state.questionData.question,
    errors: state.questionData.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createQuestion: questionPayload => {
      dispatch(create(questionPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQuestion);
