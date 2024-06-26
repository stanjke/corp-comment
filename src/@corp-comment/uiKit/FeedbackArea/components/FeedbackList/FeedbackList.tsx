import Feedback from './components/Feedback/Feedback';
import './FeedbackList.scss';
import { feedbackBeenPosted } from '@corp-comment/lib/feedbackBeenPosted';
import Spinner from '@corp-comment/uiKit/Spinner/Spinner';
import ErrorMessage from '@corp-comment/uiKit/ErrorMessage/ErrorMessage';
import { useFeedbackList } from './useFeedbackList';
import { FeedbackType } from '@corp-comment/lib/types';

export default function FeedbackList() {
  const {
    isLoaded,
    errorMessage,
    feedbackItems,
    handleDeleteComment,
    handleUpvoteComment,
    handleDownvoteComment,
  } = useFeedbackList();

  // const handleAddFeedback = (text: string): void => {
  //   const companyName = text
  //     .split(' ')
  //     .find((word: string) => word.includes('#'))!
  //     .substring(1);

  //   const newFeedback: FeedbackType = {
  //     upvoteCount: 0,
  //     companyName,
  //     text,
  //     daysAgo: Date.now(),
  //   };

  //   setFeedbackItems((prev) => [...prev, newFeedback]);
  // };

  return (
    <ol className="feedback-list">
      {isLoaded && <Spinner />}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {feedbackItems
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
