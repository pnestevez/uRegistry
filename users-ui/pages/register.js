import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// Components
import SyncLoader from 'react-spinners/SyncLoader';
import Places from '../components/Places';
import Address from '../components/Address';
import styles from '../styles/Register.module.css';
import homelStyle from '../styles/Home.module.css';
import formStyles from '../styles/Form.module.css';
// Functions
import useFormInput from '../hooks/useFormInput';
import { fetcher, notNull } from '../utils';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFullfiled, setIsFullfiled] = useState(true);

  // Form inputs
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const username = useFormInput('');
  const password = useFormInput('');
  // Address information
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const router = useRouter();

  function handleRegister(e) {
    e.preventDefault();
    // Validate not null input
    if (!notNull(
      firstName.value,
      lastName.value,
      username.value,
      password.value,
      address,
      coordinates.lat,
      coordinates.lng,
    )) {
      setIsFullfiled(false);
      return;
    }

    setIsLoading(true);

    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        password: password.value,
        address,
        coordinates,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setIsLoading(false);
        router.push('/login');
      });
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={homelStyle.brand}>uRegistry</h1>
        <h3 className={formStyles.title}>
          Tell us about
          {' '}
          <span>yourself</span>
        </h3>
        <form className={formStyles.form} onSubmit={handleRegister}>
          <div className={styles.nameSection}>
            <input
              className={formStyles.input}
              placeholder="First name"
              type="text"
              value={firstName.value}
              onChange={firstName.handleChange}
            />
            <input
              className={formStyles.input}
              placeholder="Last name"
              type="text"
              value={lastName.value}
              onChange={lastName.handleChange}
            />
          </div>
          {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            ? (
              <Places
                address={address}
                setAddress={setAddress}
                setCoordinates={setCoordinates}
              />
            )
            : (
              <Address
                address={address}
                setAddress={setAddress}
                setCoordinates={setCoordinates}
              />
            )}
          <input
            style={{ marginTop: '10px' }}
            className={formStyles.input}
            placeholder="Username"
            type="text"
            value={username.value}
            onChange={username.handleChange}
          />
          <input
            className={formStyles.input}
            placeholder="Password"
            type="password"
            value={password.value}
            onChange={password.handleChange}
          />
          <div className={formStyles.errorMessage}>{!isFullfiled ? '* All inputs are required' : null}</div>
          <div className={formStyles.button}>
            { isLoading
              ? (
                <SyncLoader
                  size={6}
                  margin={1}
                  color="black"
                />
              )
              : <button type="submit" onClick={handleRegister}>Register</button>}
          </div>
          <Link href="/login">
            <a className={formStyles.or}>or login</a>
          </Link>
        </form>
      </div>
    </div>
  );
}
