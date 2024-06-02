import FeedbackHeader from './components/FeedbackHeader/FeedbackHeader';
import FeedbackList from './components/FeedbackList/FeedbackList';
import './FeedbackArea.scss';

export default function FeedbackArea() {
  return (
    <main className="feedback-area">
      <FeedbackHeader />
      <FeedbackList />
    </main>
  );
}
