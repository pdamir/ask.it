/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LastQuestions from '../LastQuestions/LastQuestions';
import HotQuestions from '../HotQuestions/HotQuestions';
import HotUsers from '../HotUsers/HotUsers';
import AddQuestion from '../AddQuestion/AddQuestion';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false
    };
    this.lastQuestionsRef = React.createRef();
  }

  showQuestionInput() {
    this.setState({
      showInput: true
    });
  }

  hideQuestionInput() {
    this.setState(
      {
        showInput: false
      },
      () => {
        this.lastQuestionsRef.getLastQuestions(0);
      }
    );
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-8 col-lg-8">
              {this.props.token && this.props.user ? (
                <>
                  <div className="col-sm-12 text-right mb-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        this.showQuestionInput();
                      }}
                    >
                      Add a question
                    </button>
                  </div>
                  {this.state.showInput ? (
                    <AddQuestion onSubmit={() => this.hideQuestionInput()} />
                  ) : null}
                </>
              ) : null}
              <div className="questions-wrapper ">
                <LastQuestions ref={ref => (this.lastQuestionsRef = ref)} />
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4">
              <div className="sidebar-wrapper bg-primary text-white py-3">
                <HotQuestions className="mb-3" />
                <HotUsers className="mt-3" />
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
    user: state.auth.user,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Homepage);
