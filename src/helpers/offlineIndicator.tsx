import { useEffect } from 'react';


const useOfflineIndicator = () => {

  const handleNetworkStatus = () => {
    if(!navigator.onLine){
      alert('You are offline')
    }
  }

  useEffect(() => {
    window.addEventListener('online', handleNetworkStatus);
    window.addEventListener('offline', handleNetworkStatus);

    return () => {
      window.removeEventListener('online', handleNetworkStatus);
      window.removeEventListener('offline', handleNetworkStatus);
    }
  }, []);

}

export default useOfflineIndicator;
