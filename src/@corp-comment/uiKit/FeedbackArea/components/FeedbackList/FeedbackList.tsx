import { useEffect, useState } from 'react';
import Feedback from './components/Feedback/Feedback';
import './FeedbackList.scss';
import { API_URL, COMMENT_ENDPOINT, ENDPOINT } from '@corp-comment/lib/constatnts';
import { feedbackBeenPosted } from '@corp-comment/lib/feedbackBeenPosted';
import Spinner from '@corp-comment/uiKit/Spinner/Spinner';
import ErrorMessage from '@corp-comment/uiKit/ErrorMessage/ErrorMessage';
import { FeedbackType } from '@corp-comment/lib/types';
import { toast } from 'react-toastify';

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoaded(true);
    const getFeedbacks = async () => {
      try {
        const response = await fetch(
          `${API_URL}${ENDPOINT.POSTS}${COMMENT_ENDPOINT.GET_COMMENT}`,
        );

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        const data = await response.json();
        setFeedbackItems(data);
        setIsLoaded(false);
        setErrorMessage('');
        toast('✅ Feedbacks loaded successfully', { autoClose: 2000 });
      } catch (error: any) {
        setErrorMessage(error.message);
        setIsLoaded(false);
      }
    };
    getFeedbacks();
  }, []);

  const handleAddFeedback = (text: string): void => {
    const companyName = text
      .split(' ')
      .find((word: string) => word.includes('#'))!
      .substring(1);

    const newFeedback: FeedbackType = {
      upvoteCount: 0,
      companyName,
      text,
      daysAgo: Date.now(),
    };

    setFeedbackItems((prev) => [...prev, newFeedback]);
  };

  return (
    <ol className="feedback-list">
      {isLoaded && <Spinner />}
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {feedbackItems?.map((feedback) => (
        <Feedback
          key={feedback._id}
          companyName={feedback.companyName}
          upvoteCount={feedback.rating}
          text={feedback.content}
          daysAgo={feedbackBeenPosted(feedback.createdAt)}
        />
      ))}
    </ol>
  );
}
