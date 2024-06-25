import TriangleUp from '@corp-comment/uiKit/Icons/TriangleUp';
import './Feedback.scss';
import { FeedbackType } from '@corp-comment/lib/types';
import { useStore } from 'src/app/store';
import { MouseEvent } from 'react';
import { API_URL, COMMENT_ENDPOINT, ENDPOINT } from '@corp-comment/lib/constatnts';
import { toast } from 'react-toastify';

export default function Feedback({
  upvoteCount,
  companyName,
  text,
  daysAgo,
  author,
  postId,
}: FeedbackType) {
  const { userId, token } = useStore();

  const hanndleDeleteComment = async (event: MouseEvent<HTMLButtonElement>) => {
    // send request to delete comment
    event.preventDefault();

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
      const data = await response.json();

      toast('✅ Comment deleted successfully', { autoClose: 2000 });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="feedback">
      <button>
        <TriangleUp />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{companyName[0]}</p>
      </div>
      <div>
        <p>{companyName}</p>
        <p>{text} </p>
      </div>
      <p>{`${daysAgo}d`}</p>
      {userId === author._id && <button onClick={hanndleDeleteComment}>❌</button>}
    </li>
  );
}
