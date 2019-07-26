import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getHot, feedback } from '../../services/questionsService';

class HotQuestions extends Component {
  async componentDidMount() {
    this.props.getHotQuestions();
  }

  giveFeedback(id, isLike) {
    this.props.giveQuestionFeedback(id, isLike ? '0' : '1');
  }

  render() {
    return (
      <div>
        <div className="col-sm-12 col-md-12 col-lg-12 text-center my-3">Hot questions</div>
        {this.props.hotQuestions === null && <p>Loading hot questions...</p>}
        {this.props.hotQuestions &&
          this.props.hotQuestions.map(question => (
            <div key={question.id} className="col-sm-12 col-md-12 col-lg-12">
              <div className="card text-primary bg-white mb-3">
                <div className="sidebar card-header bg-success text-white p-2">
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
                    <Moment format="DD.MM.YYYY HH:mm">{question.createdAt}</Moment>
                  </div>
                </div>
                <Link to={`/question/${question.id}`}>
                  <div className="card-body p-2">
                    <h4 className="card-title">{question.text}</h4>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.questionData.errors,
    hotQuestions: state.questionData.hotQuestions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHotQuestions: () => {
      dispatch(getHot());
    },
    giveQuestionFeedback: (id, isLike) => {
      dispatch(feedback(id, isLike));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotQuestions);
