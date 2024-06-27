import Feedback from './components/Feedback/Feedback';
import './FeedbackList.scss';
import { feedbackBeenPosted } from '@corp-comment/lib/feedbackBeenPosted';
import Spinner from '@corp-comment/uiKit/Spinner/Spinner';
import ErrorMessage from '@corp-comment/uiKit/ErrorMessage/ErrorMessage';
import { useFeedbackList } from './useFeedbackList';
import { FeedbackType } from '@corp-comment/lib/types';
import { useRootStore } from 'src/app/store';

export default function FeedbackList() {
  const {
    isLoading,
    filteredFeedbacks,
    errorMessage,
    handleDeleteComment,
    handleUpvoteComment,
    handleDownvoteComment,
  } = useFeedbackList();

  console.log(isLoading);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {filteredFeedbacks
        ?.sort((a, b) => b.rating - a.rating)
        .map((feedback: FeedbackType) => (
          <Feedback
            key={feedback._id}
            companyName={feedback.companyName}
            upvoteCount={feedback.rating}
            text={feedback.content}
            daysAgo={feedbackBeenPosted(feedback.createdAt)}
            author={feedback.author}
            onUpvoteComment={() => handleUpvoteComment(feedback._id)}
            onDownvoteComment={() => handleDownvoteComment(feedback._id)}
            onDeleteComment={() => handleDeleteComment(feedback._id, feedback.author._id)}
            ratedBy={feedback.ratedBy}
          />
        ))}
    </ol>
  );
}
