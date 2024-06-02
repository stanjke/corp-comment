import { ChangeEvent, useState } from 'react';
import { MAX_CHARACTERS } from '@corp-comment/services/constatnts';
import { BUTTON_TEXT, LABEL_TEXT, TEXTAREA_ID } from './constatnts';
import './FeedbackForm.scss';
export default function FeedbackForm() {
  const [text, setText] = useState('');
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nexText = event.target.value;
    if (nexText.length < MAX_CHARACTERS) {
      setText(nexText);
    }
  };
  return (
    <form className="form">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder=""
        spellCheck="false"
        id={TEXTAREA_ID}
      />
      <label htmlFor={TEXTAREA_ID}>{LABEL_TEXT}</label>
      <div>
        <p className="u-italic">{MAX_CHARACTERS - text.length}</p>
        <button>
          <span>{BUTTON_TEXT}</span>
        </button>
      </div>
    </form>
  );
}
