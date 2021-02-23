import { useContext } from 'react';
// Context
import UserContext from '../context/UserContext';
// Components
import Card from './Card';
import styles from '../styles/Sidebar.module.css';
import formStyles from '../styles/Form.module.css';
// Functions
import useFormInput from '../hooks/useFormInput';

export default function Users({ users, setCenter, setZoom }) {
  const { me } = useContext(UserContext);

  // Handle query
  const query = useFormInput('');
  const filteredUsers = users.filter(user => user.username !== me.username
        && (
          (`${user.firstName} ${user.lastName}`).toLowerCase().match(query.value.toLowerCase())
            || user.username.toLowerCase().match(query.value.toLowerCase())
        ));

  const handleSelect = (coordinates) => {
    setCenter(coordinates);
    setZoom(12);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Users</h2>
      </div>
      <div className={styles.usersContainer}>
        <input
          className={formStyles.input}
          type="text"
          placeholder="Who are you looking for?"
          value={query.value}
          onChange={query.handleChange}
        />
        {me && (
          <Card
            styles={{
              backgroundColor: 'red',
            }}
            user={me}
            handleSelect={handleSelect}
          />
        )}

        {filteredUsers.map((user, i) => (
          <Card
            key={user._id}
            user={user}
            index={i}
            handleSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
