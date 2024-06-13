import { ChangeEvent, MouseEvent, useState } from 'react';
import { MAX_CHARACTERS } from '@corp-comment/lib/constatnts';
import { BUTTON_TEXT, LABEL_TEXT, TEXTAREA_ID } from './constatnts';
import './FeedbackForm.scss';
import { useNavigate } from 'react-router-dom';
export default function FeedbackForm() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length < MAX_CHARACTERS) {
      setText(newText);
    }
  };

  const handleAuth = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/api/user/user', {
      method: 'GET',
      headers: {
        'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWY2OGExN2M3YjFhOTI4OGYyMWRjOCIsImxvZ2luIjoic3RhbiIsImlhdCI6MTcxNzU5NDg2MSwiZXhwIjoxNzE3OTU0ODYxfQ.G8YMQWJ_AbcIAj7fYoZCEqYZU3XO8-sf03ub9jKhTNk',
      },
    });

    const user = await response.json();
    console.log(user);
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
        <button onClick={handleAuth}>
          <span>{'Login'}</span>
        </button>
      </div>
    </form>
  );
}
