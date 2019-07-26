import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import { update, remove, getSingle } from '../../services/usersService';
import { logout } from '../../redux/actions/auth/index';
import 'react-datepicker/dist/react-datepicker.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      username: '',
      password: '',
      dateOfBirth: '',
      fullName: '',
      email: '',
      newPassword: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  async componentDidMount() {
    if (this.props.token && this.props.user) {
      this.props.getUser(this.props.user.id);
      if (this.props.userData) {
        this.setUserData();
      }
    } else {
      this.props.history.replace('/');
    }
  }

  async componentDidUpdate() {
    if (!this.props.token) {
      this.props.history.replace('/');
    }

    if (!this.state.username) {
      this.setUserData();
    }
  }

  setUserData() {
    this.setState({
      username: this.props.userData.username,
      fullName: this.props.userData.fullName,
      email: this.props.userData.email,
      dateOfBirth: this.props.userData.dateOfBirth
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value
    });
  }

  handleDateChange(date) {
    this.setState({
      dateOfBirth: date
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.submit();
  }

  async deleteUser() {
    // eslint-disable-next-line no-undef, no-alert
    const confirmed = window.confirm('Are you sure you want to delete your account?');
    if (confirmed) {
      this.props.deleteUser(this.props.userData.id);
      this.props.logout();
    }
  }

  async submit() {
    this.setState({
      disabled: true
    });

    const payload = {
      id: this.props.userData.id,
      username: this.state.username,
      email: this.state.email,
      dateOfBirth: this.state.dateOfBirth,
      fullName: this.state.fullName
    };
    if (this.state.newPassword) {
      payload.password = this.state.password;
      payload.newPassword = this.state.newPassword;
    }

    this.props.updateUser(payload);
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
                  <h4 className="text-center text-primary">Profile</h4>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">
                        Username
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        disabled
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="d-flex align-items-center">
                        Current password
                        <span className="text-danger">*</span>
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
                    <div className="form-group">
                      <label htmlFor="newPassword" className="d-flex align-items-center">
                        New password
                        <span className="text-danger">*</span>
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="ml-2 mr-1 clickable"
                          title="Password must contain at least 8 characters, 1 uppercase letter and 1 number"
                        />
                      </label>
                      <input
                        disabled={this.state.disabled}
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="form-control"
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        disabled={this.state.disabled}
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="fullName">Full name</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        name="fullName"
                        id="fullName"
                        className="form-control"
                        value={this.state.fullName}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateOfBirth">Date of birth</label>
                      <br />
                      <DatePicker
                        className="form-control w-100"
                        selected={
                          this.state.dateOfBirth
                            ? Date.parse(this.state.dateOfBirth)
                            : Date.parse(null)
                        }
                        onSelect={this.handleDateChange}
                        onChange={this.handleDateChange}
                      />
                    </div>
                    <div className="form-group d-flex justify-content-between ">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.deleteUser()}
                      >
                        Delete account and logout
                      </button>
                      <button
                        type="submit"
                        disabled={this.state.disabled}
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                  <div id="register-link" className="text-right">
                    <Link className="text-info mr-4" to="/">
                      Back to homepage
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
    errors: state.auth.errors,
    userData: state.userData.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: id => {
      dispatch(getSingle(id));
    },
    updateUser: updateData => {
      dispatch(update(updateData));
    },
    deleteUser: deleteData => {
      dispatch(remove(deleteData));
    },
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
