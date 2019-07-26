import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { logout } from '../../redux/actions/auth/index';
import logo from '../../images/logo.png';

const NavBar = props => {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary fixed-top">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img className="mr-2" height="34" width="34" src={logo} alt="logo" />
          Ask.it
        </Link>
        {props.token && props.user ? (
          <div>
            <Link className="navbar-brand mr-3" to="/profile">
              <button type="button" className="btn btn-success">
                {props.user.username}
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                props.logout();
                props.history.replace('/login');
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link className="navbar-brand mr-3" to="/login">
              <button type="button" className="btn btn-success">
                Log In
              </button>
            </Link>

            <Link className="navbar-brand" to="/register">
              <button type="button" className="btn btn-success">
                Register
              </button>
            </Link>
          </div>
        )}
      </nav>
      <LoadingBar className="loading-bar" />
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
