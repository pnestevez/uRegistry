import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
// Context
import { Marker } from '@react-google-maps/api';
import UserContext from '../../context/UserContext';
// Components
import Layout from '../../components/Layout';
import Map from '../../components/Map';
import NotMap from '../../components/NotMap';
import Message from '../../components/Message';
import styles from '../../styles/Sidebar.module.css';
// Functions
import { fetcher } from '../../utils';

export default function User() {
  const router = useRouter();

  const { me } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('uRegistryAccessToken');

    if (me) {
      const { username } = router.query;

      fetcher(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`, {
        method: 'GET',
        headers: {
          authorization: token,
        },
      })
        .then(data => data && setUser(data));
    }
  }, [me]);

  return (
    <Layout>
      {user
        ? (
          <>
            <Map
              center={user.coordinates}
              zoom={16}
            >
              <Marker position={user.coordinates} />
            </Map>
            <div className={styles.container}>
              <div className={styles.title}>
                <h2>{`${user.firstName} ${user.lastName}`}</h2>
              </div>
              <div className={styles.usersContainer}>
                <div className={styles.address}>{user.address}</div>
                <div className={styles.coordinates}>{`Latitud: ${user.coordinates.lat} | Longitude: ${user.coordinates.lng}`}</div>
                <div className={styles.username}>{`@${user.username}`}</div>
              </div>
            </div>
          </>
        )
        : (
          <>
            <NotMap />
            <Message />
          </>
        )}
    </Layout>
  );
}
