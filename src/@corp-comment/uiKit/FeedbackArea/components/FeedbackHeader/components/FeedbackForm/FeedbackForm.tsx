import { ChangeEvent, MouseEvent, useState } from 'react';
import {
  API_URL,
  COMMENT_ENDPOINT,
  ENDPOINT,
  MAX_CHARACTERS,
  USER_ENDPOINT,
} from '@corp-comment/lib/constatnts';
import { BUTTON_TEXT, LABEL_TEXT, TEXTAREA_ID } from './constatnts';
import './FeedbackForm.scss';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from 'src/app/store';
import { toast } from 'react-toastify';
import { extractHashtag } from '@corp-comment/lib/extractHashtag';
import { removeHashtag } from '@corp-comment/lib/removeHashtag';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const { token, addToken, addUserId } = useRootStore();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length < MAX_CHARACTERS) {
      setText(newText);
    }
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (text.length === 0) {
      return toast('❌ Please enter your comment first!', { autoClose: 2000 });
    }

    const companyName = extractHashtag(text);

    if (!companyName) {
      return toast('❌ Please enter a valid company name!', { autoClose: 2000 });
    }

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
      const response = await fetch(
        `${API_URL}${ENDPOINT.COMMENT}${COMMENT_ENDPOINT.CREATE_COOMENT}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(comment),
        },
      );

      if (!response.ok) return;

      const data = await response.json();
      toast(`✅ ${data.message}`, { autoClose: 2000 });
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const obj = { loginOrEmail: 'stan', password: 'blabla' };
    try {
      const response = await fetch(`${API_URL}${ENDPOINT.USER}${USER_ENDPOINT.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });

      const data = await response.json();

      if (data.token) {
        addToken(data.token);
        addUserId(data.userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAuth = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/api/user/user', {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    });

    const user = await response.json();
    console.log(user);
  };

  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToken('');
    addUserId('');
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
        <button onClick={handleLogout}>
          <span>{'Logout'}</span>
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
