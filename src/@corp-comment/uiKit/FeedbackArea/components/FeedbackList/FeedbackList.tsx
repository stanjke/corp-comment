import { useEffect, useState } from 'react';
import Feedback from './components/Feedback/Feedback';
import './FeedbackList.scss';
export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  useEffect(() => {}, []);
  return (
    <ol className="feedback-list">
      <Feedback
        companyName={'companyname'}
        daysAgo={3}
        text={'kksdgksdkgksdgksg sdkgdskg ks gks kgd'}
        upvoteCount={100}
      />
      {/* <Feedback /> */}
    </ol>
  );
}
