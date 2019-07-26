import React, { Component } from 'react';
import { connect } from 'react-redux';
import { create } from '../../services/answersService';

class AddAnswer extends Component {
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
    this.props.createAnswer({
      text: this.state.text,
      userId: this.props.user.id,
      questionId: this.props.questionId
    });
    this.setState({
      disabled: false,
      text: ''
    });

    this.props.onSubmit();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="d-flex align-items-center form-group">
            <label htmlFor="text" className="text-primary mb-0 mr-3">
              Answer:
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
    answer: state.answerData.question,
    errors: state.answerData.errors,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createAnswer: answerPayload => {
      dispatch(create(answerPayload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAnswer);
