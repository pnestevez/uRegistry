import Link from 'next/link';
import { useContext } from 'react';
// Context
import UserContext from '../context/UserContext';
// Components
import styles from '../styles/Home.module.css';

export default function Layout({ children }) {
  const { me, setMe } = useContext(UserContext);

  const handleLogout = () => {
    window.localStorage.removeItem('uRegistryAccessToken');
    setMe(null);
  };

  return (
    <div className={styles.container}>
      <Link href="/users">
        <a>
          <h1 className={styles.title}>uRegistry</h1>
        </a>
      </Link>
      {me
        ? (
          <div className={styles.logout}>
            <img
              onClick={handleLogout}
              src="/close.svg"
              alt="close"
            />
          </div>
        )
        : null}

      {children}

    </div>
  );
}
