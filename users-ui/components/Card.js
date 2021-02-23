// Components
import styles from '../styles/Card.module.css';

export default function Card({ user, index, handleSelect }) {
  const style = {};
  if (index === undefined) {
    style.backgroundColor = 'black';
    style.color = 'whitesmoke';
    style.borderRadius = '0 0 7.5px 7.5px';
  }
  if (index % 2) style.backgroundColor = 'whitesmoke';

  return (
    <div
      className={styles.card}
      style={style}
      onClick={() => handleSelect(user.coordinates)}
    >
      <div className={styles.initials}>{user.firstName[0] + user.lastName[0]}</div>
      <div className={styles.info}>
        <h4>{`${user.firstName} ${user.lastName}`}</h4>
        <p>
          @
          {user.username}
        </p>
      </div>
    </div>
  );
}
