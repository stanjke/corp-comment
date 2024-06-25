import { ChangeEvent, MouseEvent, useState } from 'react';
import { MAX_CHARACTERS } from '@corp-comment/lib/constatnts';
import { BUTTON_TEXT, LABEL_TEXT, TEXTAREA_ID } from './constatnts';
import './FeedbackForm.scss';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'src/app/store';
import { toast } from 'react-toastify';
import { extractHashtag } from '@corp-comment/lib/extractHashtag';
import { removeHashtag } from '@corp-comment/lib/removeHashtag';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { token, addToken } = useStore();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length < MAX_CHARACTERS) {
      setText(newText);
    }
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // check if text has at least one character
    // check if text includes #
    // prepare data for the request
    // send request

    if (text.length === 0) {
      return toast('❌ Please enter your comment first!', { autoClose: 2000 });
    }

    const companyName = extractHashtag(text);

    if (!companyName) {
      return toast('❌ Please enter a valid company name!', { autoClose: 2000 });
    }

    console.log('REMOVE HASHTAG: ', removeHashtag(companyName[0]));

    const comment = {
      content: text,
      companyName: removeHashtag(companyName[0]),
      createdAt: Date.now(),
      rating: 0,
    };

    if (!token) {
      return toast('❌ Please login first!', { autoClose: 2000 });
    }

    try {
      const response = await fetch('http://localhost:3000/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(comment),
      });
      const data = await response.json();
      console.log('COMMENT DATA: ', data);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const obj = { loginOrEmail: 'stan', password: 'blabla' };
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });

      const { token } = await response.json();

      if (token) {
        addToken(token);
      }
      console.log('LOGIN DATA: ', token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAuth = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/api/user/user', {
      method: 'GET',
      headers: {
        'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2E5YTBjMjkzZjcxNjQxZTliMzNlYSIsImxvZ2luIjoic3RhbiIsImlhdCI6MTcxOTMxMDg3NiwiZXhwIjoxNzE5NjcwODc2fQ.5y7hO6zKeCTlC4alzIhDmSFVDSzq5xXenatSa5MVgPQ',
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
        <button onClick={handleSubmit}>
          <span>{BUTTON_TEXT}</span>
        </button>
        <button onClick={handleAuth}>
          <span>{'Auth'}</span>
        </button>
        <button onClick={handleLogin}>
          <span>{'Login'}</span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log('STORE TOKEN: ', token);
          }}
        >
          <span>{'Store'}</span>
        </button>
      </div>
    </form>
  );
}
