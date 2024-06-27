import { MAX_CHARACTERS } from '@corp-comment/lib/constatnts';
import { BUTTON_TEXT, LABEL_TEXT, TEXTAREA_ID } from './constatnts';
import './FeedbackForm.scss';
import { useNavigate } from 'react-router-dom';
import { useFeedbackForm } from './useFeedbackForm';

export default function FeedbackForm() {
  const navigate = useNavigate();

  const { text, handleInputChange, handleSubmit, handleTest, handleLogin } =
    useFeedbackForm();

  return (
    <form className="form">
      <textarea
        value={text}
        onChange={handleInputChange}
        placeholder=""
        spellCheck="false"
        id={TEXTAREA_ID}
      />
      <label htmlFor={TEXTAREA_ID}>{LABEL_TEXT}</label>
      <div>
        <p className="u-italic">{MAX_CHARACTERS - text.length}</p>
        <button onClick={handleSubmit}>
          <span>{BUTTON_TEXT}</span>
        </button>
        <button onClick={handleTest}>
          <span>TEST</span>
        </button>
        <button onClick={handleLogin}>
          <span>Login</span>
        </button>
      </div>
    </form>
  );
}
