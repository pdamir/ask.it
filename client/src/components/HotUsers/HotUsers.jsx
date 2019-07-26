import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMostAnswers } from '../../services/usersService';

class HotUsers extends Component {
  async componentDidMount() {
    this.props.getHotUsers();
  }

  render() {
    return (
      <div>
        <div className="col-sm-12 col-md-12 col-lg-12 text-center my-3">
          Users with most answers
        </div>
        {this.props.hotUsers === null && <p>Loading users...</p>}
        {this.props.hotUsers &&
          this.props.hotUsers.map(user => (
            <div key={user.id} className="col-sm-12 col-md-12 col-lg-12">
              <div className="card text-white bg-success mb-3">
                <div className="sidebar card-header p-2">
                  <div>
                    <span className="mr-1">Answers:</span>
                    {user.answersCount}
                  </div>
                </div>
                <div className="card-body p-2">
                  <h4 className="card-title">{user.username}</h4>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.userData.errors,
    hotUsers: state.userData.hotUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHotUsers: () => {
      dispatch(getMostAnswers());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotUsers);
