// Components
import styles from '../styles/Sidebar.module.css';

export default function Sidebar({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Users</h2>
      </div>
      <div className={styles.usersContainer}>

        {children}

      </div>
    </div>
  );
}
