import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { spotifyApi } from '../config/spotify';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await spotifyApi.authenticate();
        navigate('/');
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return <LoadingSpinner />;
};

export default Callback;