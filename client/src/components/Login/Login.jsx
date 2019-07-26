import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { login } from '../../services/authService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.checkLoggedIn();
  }

  componentDidUpdate() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    if (this.props.token && this.props.user) {
      this.props.history.replace('/');
    }
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

    this.props.login(this.state);
    this.setState({
      disabled: false
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-center pt-5">Ask.it</h1>
        <div className="container">
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <div id="login-form" className="form-group text-primary">
                  <h4 className="text-center text-primary">Log in</h4>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="d-flex align-items-center">
                        Password
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="ml-2 mr-1 clickable"
                          title="Password must contain at least 8 characters, 1 uppercase letter and 1 number"
                        />
                      </label>
                      <input
                        disabled={this.state.disabled}
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group text-right">
                      <button
                        type="submit"
                        disabled={this.state.disabled}
                        className="btn btn-primary"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                  <div id="register-link" className="text-right">
                    <Link className="text-info mr-4" to="/">
                      Back to homepage
                    </Link>
                    <Link className="text-info" to="/register">
                      Register here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    errors: state.auth.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: loginData => {
      dispatch(login(loginData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
