import { API_URL, COMMENT_ENDPOINT, ENDPOINT } from '@corp-comment/lib/constatnts';
import { extractCompaniesWithHashtag } from '@corp-comment/lib/extractCompaniesWithHashtag';
import { FeedbackType } from '@corp-comment/lib/types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRootStore } from 'src/app/store';

export const useFeedbackList = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const token = useRootStore((state) => state.token);
  const addCompanies = useRootStore((state) => state.addCompanies);
  const updateFeedbacks = useRootStore((state) => state.updateFeedbacks);
  const isUpdating = useRootStore((state) => state.isUpdating);
  const toggleIsUpdating = useRootStore((state) => state.toggleIsUpdating);
  const setIsLoading = useRootStore((state) => state.setIsLoading);
  const feedbacks = useRootStore((state) => state.feedbacks);
  const isLoading = useRootStore((state) => state.isLoading);
  const selectedCompany = useRootStore((state) => state.selectedCompany);

  useEffect(() => {
    setIsLoading(true);
    const getFeedbacks = async () => {
      try {
        const response = await fetch(
          `${API_URL}${ENDPOINT.COMMENT}${COMMENT_ENDPOINT.GET_COMMENT}`,
        );
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        console.log();
        updateFeedbacks(data);
        addCompanies([...new Set(extractCompaniesWithHashtag(data))]);
        setErrorMessage('');
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    };
    getFeedbacks();
  }, [isUpdating]);

  const filteredFeedbacks = selectedCompany
    ? feedbacks.filter(
        (feedback: FeedbackType) => feedback.companyName === selectedCompany,
      )
    : feedbacks;

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

      toggleIsUpdating();
      toast('✅ Comment deleted successfully', { autoClose: 2000 });
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
    errorMessage,
    handleDeleteComment,
    handleUpvoteComment,
    handleDownvoteComment,
    filteredFeedbacks,
    isLoading,
  };
};
