import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { get, feedback } from '../../services/questionsService';

class LastQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0
    };
  }

  async componentDidMount() {
    this.getLastQuestions();
  }

  getLastQuestions(page = this.state.page) {
    if (page !== this.state.page) {
      this.setState({
        page
      });
    }
    this.props.getQuestions({ page });
  }

  giveFeedback(id, isLike) {
    this.props.giveQuestionFeedback(id, isLike ? '0' : '1');
  }

  loadMore() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.props.getQuestions({ page: this.state.page });
      }
    );
  }

  render() {
    return (
      <div>
        {this.props.questions === null && <p>Loading questions...</p>}
        {this.props.questions &&
          this.props.questions.results &&
          this.props.questions.results.map(question => (
            <div key={question.id} className="col-sm-12 col-md-12 col-lg-12">
              <div className="card text-white bg-success mb-3">
                <div className="card-header">
                  Answers:
                  {question.answersCount}
                </div>
                <Link to={`/question/${question.id}`}>
                  <div className="card-body">
                    <h4 className="card-title">{question.text}</h4>
                  </div>
                </Link>

                <div className="card-footer question-footer text-white">
                  <div>
                    <button
                      type="button"
                      className={`mr-2 feedback ${
                        +question.hasLiked === 1 ? ' text-primary' : 'text-white'
                      }`}
                      onClick={() => {
                        this.giveFeedback(question.id, true);
                      }}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} className="mr-1 clickable" />
                      {question.likesCount}
                    </button>

                    <button
                      type="button"
                      className={`clickable feedback mr-2 ${
                        +question.hasDisliked === 1 ? ' text-primary' : 'text-white'
                      }`}
                      onClick={() => {
                        this.giveFeedback(question.id, false);
                      }}
                    >
                      <FontAwesomeIcon icon={faThumbsDown} className="mr-1 clickable" />
                      {question.dislikesCount}
                    </button>
                  </div>
                  <div>
                    <span className="mr-4 font-weight-bold font-italic">
                      {question.user.username}
                    </span>
                    <span className="ml-2">
                      <Moment format="DD.MM.YYYY HH:mm">{question.createdAt}</Moment>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {this.props.questions && this.props.questions.totalPages > this.props.questions.page + 1 && (
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
    questions: state.questionData.questions,
    errors: state.questionData.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: params => {
      dispatch(get(params));
    },
    giveQuestionFeedback: (id, isLike) => {
      dispatch(feedback(id, isLike));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(LastQuestions);
