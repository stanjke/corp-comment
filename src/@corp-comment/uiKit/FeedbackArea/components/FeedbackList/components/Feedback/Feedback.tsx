import TriangleUp from '@corp-comment/uiKit/Icons/TriangleUp';
import './Feedback.scss';

type Props = {
  upvoteCount: number;
  companyName: string;
  text: string;
  daysAgo: number;
};
export default function Feedback({ upvoteCount, companyName, text, daysAgo }: Props) {
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
