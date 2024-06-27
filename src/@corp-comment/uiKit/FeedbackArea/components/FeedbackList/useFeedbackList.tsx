import { API_URL, COMMENT_ENDPOINT, ENDPOINT } from '@corp-comment/lib/constatnts';
import { FeedbackType } from '@corp-comment/lib/types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRootStore } from 'src/app/store';

export const useFeedbackList = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updatedFeedback, setUpdatedFeedback] = useState(true);

  const token = useRootStore((state) => state.token);
  const isUpdating = useRootStore((state) => state.isUpdating);
  const toggleIsUpdating = useRootStore((state) => state.toggleIsUpdating);

  useEffect(() => {
    setIsLoaded(true);
    const getFeedbacks = async () => {
      try {
        const response = await fetch(
          `${API_URL}${ENDPOINT.COMMENT}${COMMENT_ENDPOINT.GET_COMMENT}`,
        );

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        const data = await response.json();

        setFeedbackItems(data);
        setIsLoaded(false);
        setErrorMessage('');
      } catch (error: any) {
        setErrorMessage(error.message);
        setIsLoaded(false);
      }
    };
    getFeedbacks();
  }, [isUpdating]);

  const handleDeleteComment = async (postId: string, userId: string) => {
    const obj = {
      postId,
      userId,
    };

    try {
      const response = await fetch(
        `${API_URL}${ENDPOINT.COMMENT}${COMMENT_ENDPOINT.DELETE_COMMENT}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(obj),
        },
      );

      if (!response.ok) throw new Error();

      const data = await response.json();

      toast('✅ Comment deleted successfully', { autoClose: 2000 });
      toggleIsUpdating();
    } catch (error) {
      console.warn(error);
    }
  };

  const handleUpvoteComment = async (postId: string) => {
    const obj = {
      postId,
    };

    if (!token) {
      toast('❌ You need to login first to rate a comment', { autoClose: 2000 });
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}${ENDPOINT.COMMENT}${COMMENT_ENDPOINT.UPVOTE_COMMENT}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(obj),
        },
      );

      if (response.ok) {
        const { message } = await response.json();
        toast(`✅ ${message}`, { autoClose: 2000 });
        toggleIsUpdating();
      }
    } catch (error: any) {
      console.warn(error.message);
    }
  };

  const handleDownvoteComment = async (postId: string) => {
    const obj = {
      postId,
    };

    if (!token) {
      toast('❌ You need to login first to rate a comment', { autoClose: 2000 });
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}${ENDPOINT.COMMENT}${COMMENT_ENDPOINT.DOWNVOTE_COMMENT}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(obj),
        },
      );

      if (response.ok) {
        const { message } = await response.json();
        toast(`✅ ${message}`, { autoClose: 2000 });
        toggleIsUpdating();
      }
    } catch (error: any) {
      console.warn(error.message);
    }
  };

  return {
    isLoaded,
    errorMessage,
    feedbackItems,
    handleDeleteComment,
    handleUpvoteComment,
    handleDownvoteComment,
  };
};
