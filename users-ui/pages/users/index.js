import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
// Context
import { Marker } from '@react-google-maps/api';
import UserContext from '../../context/UserContext';
// Components
import Layout from '../../components/Layout';
import Map from '../../components/Map';
import Users from '../../components/Users';
import Message from '../../components/Message';

// Functions
import { fetcher } from '../../utils';

export default function Home() {
  const router = useRouter();

  const { me } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [center, setCenter] = useState(
    me ? me.coordinates : { lat: -34.635, lng: -58.366 },
  );
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (me) {
      const token = window.localStorage.getItem('uRegistryAccessToken');

      fetcher(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'GET',
        headers: {
          authorization: token,
        },
      })
        .then(data => data && setUsers(data));
    }
  }, [me]);

  return (
    <Layout>
      <Map
        center={center}
        zoom={zoom}
      >
        {me
          ? users.map(user => (
            <Marker
              key={user._id}
              position={user.coordinates}
              onClick={() => router.push(`/users/${user.username}`)}
            />
          ))
          : null}
      </Map>
      {me
        ? (
          <Users
            users={users}
            setCenter={setCenter}
            setZoom={setZoom}
          />
        )
        : <Message />}
    </Layout>
  );
}

export function getServerSideProps() {
  return fetcher(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    .then((users) => ({
      props: {
        users,
      },
    }));
}
