import styles from '../styles/Login.module.css';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApi';

export default function Login() {
  const router = useRouter();
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await login({ email, password }).unwrap(); //! return the token
      dispatch(setCredentials({ ...token, email }));
      setEmail('');
      setPassword('');
      router.push('/welcome');
    } catch (err) {
      console.log('err => ', err.data?.message);
      console.log('err => ', err);

      if (err.data?.message) {
        setErrMsg(err.data?.message);
      } else {
        setErrMsg('Login Failed');
      }

      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className={styles.section}>
          <div className={styles.container}>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
              {errMsg}
            </p>
            <h1 className={styles.title}>Login</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputWrapper}>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  ref={emailRef}
                  value={email}
                  className={styles.input}
                  onChange={handleEmailInput}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="">Password</label>
                <input
                  type="text"
                  value={password}
                  className={styles.input}
                  onChange={handlePasswordInput}
                />
              </div>

              <div className={styles.btnWrapper}>
                <button className={styles.btn}>Login</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
