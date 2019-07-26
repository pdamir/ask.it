/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import AddAnswer from '../AddAnswer/AddAnswer';
import Answers from '../Answers/Answers';
import { getSingle, feedback } from '../../services/questionsService';
import { feedback as answerFeedback } from '../../services/answersService';

class Question extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      questionId: params.questionId
    };

    this.answers = React.createRef();
  }

  async componentDidMount() {
    if (this.state.questionId) {
      this.getQuestionById();
    }
  }

  getQuestionById() {
    this.props.getQuestion(this.state.questionId);
  }

  getLastAnswers() {
    this.answers.getLastAnswers(0);
  }

  giveFeedback(id, isLike) {
    this.props.giveQuestionFeedback(id, isLike ? '0' : '1');
  }

  render() {
    if (this.props.question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-5">{this.props.question.text}</h1>
            <div className="question-footer">
              <div>
                <button
                  type="button"
                  className={`mr-2 feedback ${
                    +this.props.question.hasLiked === 1 ? ' text-success' : 'text-primary'
                  }`}
                  onClick={() => {
                    this.giveFeedback(this.props.question.id, true);
                  }}
                >
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-1 clickable" />
                  {this.props.question.likesCount}
                </button>
                <button
                  type="button"
                  className={`clickable feedback mr-2 ${
                    +this.props.question.hasDisliked === 1 ? ' text-success' : 'text-primary'
                  }`}
                  onClick={() => {
                    this.giveFeedback(this.props.question.id, false);
                  }}
                >
                  <FontAwesomeIcon icon={faThumbsDown} className="mr-1 clickable" />
                  {this.props.question.dislikesCount}
                </button>
              </div>
              <div>
                <span className="mr-4 font-weight-bold font-italic">
                  {this.props.question.user.username}
                </span>
                <span className="mr-2">
                  <Moment format="DD.MM.YYYY HH:mm">{this.props.question.createdAt}</Moment>
                </span>
              </div>
            </div>
            <hr className="my-4" />
            {this.props.token && this.props.user ? (
              <AddAnswer
                questionId={this.state.questionId}
                onSubmit={() => this.getLastAnswers()}
              />
            ) : null}
            <hr className="my-4" />
            <Answers questionId={this.state.questionId} ref={ref => (this.answers = ref)} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.questionData.errors,
    token: state.auth.token,
    user: state.auth.user,
    question: state.questionData.question
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: id => {
      dispatch(getSingle(id));
    },
    giveQuestionFeedback: (id, isLike) => {
      dispatch(feedback(id, isLike));
    },
    giveAnswerFeedback: (id, isLike) => {
      dispatch(answerFeedback(id, isLike));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
