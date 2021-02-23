import { useState, useEffect, createContext } from 'react';
import { fetcher } from '../utils';

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [me, setMe] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('uRegistryAccessToken');
    if (token) {
      fetcher(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        method: 'GET',
        headers: {
          authorization: token,
        },
      })
        .then(data => {
          data
            ? setMe(data._doc)
            : window.localStorage.removeItem('uRegistryAccessToken');
        });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        me,
        setMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
