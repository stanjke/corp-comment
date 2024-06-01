import FeedbackArea from '../@corp-comment/uiKit/FeedbackArea/FeedbackArea';
import Footer from '../@corp-comment/uiKit/Footer/Footer';
import HashtagList from '../@corp-comment/uiKit/HashtagList/HashtagList';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Footer />
      <FeedbackArea />
      <HashtagList />
    </div>
  );
}

export default App;
