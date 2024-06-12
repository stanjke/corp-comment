import { useEffect, useState } from 'react';
import Feedback from './components/Feedback/Feedback';
import './FeedbackList.scss';
import { API_URL, COMMENT_ENDPOINT, ENDPOINT } from '@corp-comment/services/constatnts';
import { feedbackBeenPosted } from '@corp-comment/services/feedbackBeenPosted';
import Spinner from '@corp-comment/uiKit/Spinner/Spinner';
export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const getFeedbacks = async () => {
      const response = await fetch(
        `${API_URL}${ENDPOINT.POSTS}${COMMENT_ENDPOINT.GET_COMMENT}`,
      );
      const feedbacks = await response.json();
      setFeedbackItems(feedbacks);
      setIsLoaded(false);
    };
    getFeedbacks();
  }, []);

  console.log('feedbackItems: ', feedbackItems);
  return (
    <ol className="feedback-list">
      {isLoaded && <Spinner />}
      {feedbackItems?.map((feedback) => (
        <Feedback
          companyName={feedback.companyName}
          upvoteCount={feedback.rating}
          text={feedback.content}
          daysAgo={feedbackBeenPosted(feedback.createdAt)}
        />
      ))}
    </ol>
  );
}
