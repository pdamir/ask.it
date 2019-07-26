import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { get, feedback } from '../../services/answersService';

class Answers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      questionId: props.questionId
    };
  }

  async componentDidMount() {
    this.getLastAnswers();
  }

  getLastAnswers(page = this.state.page) {
    if (page !== this.state.page) {
      this.setState({
        page
      });
    }
    this.props.getAnswers({ page, questionId: this.state.questionId });
  }

  giveFeedback(id, isLike) {
    this.props.giveAnswerFeedback(id, isLike ? '0' : '1');
  }

  loadMore() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.props.getAnswers({ page: this.state.page, questionId: this.state.questionId });
      }
    );
  }

  render() {
    return (
      <div>
        {this.props.answers === null && <p>Loading answers...</p>}
        {this.props.answers && this.props.answers.results.length === 0 && (
          <p className="text-center">No answers</p>
        )}
        {this.props.answers &&
          this.props.answers.results.map((answer, idx) => (
            <div key={idx} className="card text-white bg-success mb-3">
              <div className="card-body">
                <h4 className="card-title">{answer.text}</h4>
              </div>
              <div className="card-footer question-footer text-white">
                <div>
                  <button
                    type="button"
                    className={`mr-2 feedback ${
                      +answer.hasLiked === 1 ? ' text-primary' : 'text-white'
                    }`}
                    onClick={() => {
                      this.giveFeedback(answer.id, true);
                    }}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-1 clickable" />
                    {answer.likesCount}
                  </button>
                  <button
                    type="button"
                    className={`clickable feedback mr-2 ${
                      +answer.hasDisliked === 1 ? ' text-primary' : 'text-white'
                    }`}
                    onClick={() => {
                      this.giveFeedback(answer.id, false);
                    }}
                  >
                    <FontAwesomeIcon icon={faThumbsDown} className="mr-1 clickable" />
                    {answer.dislikesCount}
                  </button>
                </div>
                <div>
                  <span className="mr-4 font-weight-bold font-italic">{answer.user.username}</span>
                  <span className="mr-2">
                    <Moment format="DD.MM.YYYY HH:mm">{answer.createdAt}</Moment>
                  </span>
                </div>
              </div>
            </div>
          ))}
        {this.props.answers && this.props.answers.totalPages > this.props.answers.page + 1 && (
          <div className="d-flex justify-content-center mb-4">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                this.loadMore();
              }}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    answers: state.answerData.answers,
    errors: state.answerData.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAnswers: params => {
      dispatch(get(params));
    },
    giveAnswerFeedback: (id, isLike) => {
      dispatch(feedback(id, isLike));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Answers);
