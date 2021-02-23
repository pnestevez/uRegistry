import { useContext } from 'react';
import Link from 'next/link';
// Context
import UserContext from '../context/UserContext';
// Components
import styles from '../styles/Sidebar.module.css';

export default function Message() {
  const { me } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{me ? 'User not found' : "You're not logged in" }</h2>
      </div>
      <div className={styles.messageContainer}>
        {!me
          ? (
            <Link href="/login">
              <a>Login!</a>
            </Link>
          )
          : null}
      </div>
    </div>
  );
}
