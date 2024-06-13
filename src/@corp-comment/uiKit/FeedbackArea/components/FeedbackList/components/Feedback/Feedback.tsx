import TriangleUp from '@corp-comment/uiKit/Icons/TriangleUp';
import './Feedback.scss';
import { FeedbackType } from '@corp-comment/lib/types';

export default function Feedback({
  upvoteCount,
  companyName,
  text,
  daysAgo,
}: FeedbackType) {
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
    </li>
  );
}
