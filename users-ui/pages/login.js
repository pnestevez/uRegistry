import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
// Context
import SyncLoader from 'react-spinners/SyncLoader';
import Link from 'next/link';
import UserContext from '../context/UserContext';
// Components
import styles from '../styles/Login.module.css';
import homelStyle from '../styles/Home.module.css';
import formStyles from '../styles/Form.module.css';
// Functions
import useFormInput from '../hooks/useFormInput';
import { fetcher, notNull } from '../utils';

export default function Login() {
  const router = useRouter();

  const { setMe } = useContext(UserContext);
  const [isFullfiled, setIsFullfiled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // Form inputs
  const username = useFormInput('');
  const password = useFormInput('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!notNull(
      username.value,
      password.value,
    )) {
      setIsFullfiled(false);
      return;
    }

    setIsLoading(true);
    fetcher(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res) {
          window.localStorage.setItem('uRegistryAccessToken', res.accessToken);
          setMe(res.me);
          router.push('/users');
        } else {
          password.reset();
          setIsFullfiled(false);
          setIsLoading(false);
        }
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={homelStyle.brand}>uRegistry</h1>
        <h3 className={formStyles.title}>
          Please
          {' '}
          <span>login</span>
        </h3>
        <form className={formStyles.form} onSubmit={handleLogin}>
          <input
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
          <div className={formStyles.errorMessage}>{!isFullfiled ? '* Username or password is incorrect' : null}</div>
          <div className={formStyles.button}>
            { isLoading
              ? (
                <SyncLoader
                  size={6}
                  margin={1}
                  color="black"
                />
              )
              : <button type="submit" onClick={handleLogin}>Lets go!</button>}
          </div>
          <Link href="/register">
            <a className={formStyles.or}>or register</a>
          </Link>
        </form>
      </div>
    </div>
  );
}
