import TriangleUp from '@corp-comment/uiKit/Icons/TriangleUp';
import './Feedback.scss';
import { useRootStore } from 'src/app/store';
import { MouseEvent } from 'react';

export type Props = {
  upvoteCount: number;
  companyName: string;
  text: string;
  daysAgo: number;
  author: {
    _id: string;
    login: string;
  };
  onUpvoteComment: () => void;
  onDownvoteComment: () => void;
  onDeleteComment: () => void;
  ratedBy: string[];
};

export default function Feedback({
  upvoteCount,
  companyName,
  text,
  daysAgo,
  author,
  onUpvoteComment,
  onDownvoteComment,
  onDeleteComment,
  ratedBy,
}: Props) {
  const userId = useRootStore((state) => state.userId);

  const isRated = ratedBy.includes(userId);

  return (
    <li className="feedback">
      <button
        className={isRated ? 'rated' : ''}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          isRated ? onDownvoteComment() : onUpvoteComment();
        }}
      >
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
      {userId === author._id && (
        <button
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onDeleteComment();
          }}
        >
          ❌
        </button>
      )}
    </li>
  );
}
