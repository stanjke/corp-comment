import { API_URL, COMMENT_ENDPOINT, ENDPOINT } from '@corp-comment/lib/constatnts';
import { extractHashtag } from '@corp-comment/lib/extractHashtag';
import { removeHashtag } from '@corp-comment/lib/removeHashtag';
import { MouseEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useRootStore } from 'src/app/store';

export const useFeedbackForm = () => {
  const [text, setText] = useState('');
  const { token, addToken, addUserId, toggleIsUpdating } = useRootStore();

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      toggleIsUpdating();
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

  return { handleInputChange, handleSubmit, text, handleLogin, handleAuth };
};
