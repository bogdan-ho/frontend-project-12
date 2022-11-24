import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { fetchData } from '../slices/channelsSlice';
import useAuth from '../hooks';

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);


  return <div>This is HomePage</div>;
};

export default ChatPage;
