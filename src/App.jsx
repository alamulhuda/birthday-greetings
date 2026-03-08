import { useState, useEffect } from 'react';
import GoldParticles from './components/GoldParticles';
import CountdownPage from './components/CountdownPage';
import CelebrationPage from './components/CelebrationPage';

const BIRTHDAY = new Date('2026-03-09T00:00:00+07:00');

export default function App() {
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      setIsBirthday(now >= BIRTHDAY);
    };

    check();
    const timer = setInterval(check, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <GoldParticles />
      {isBirthday ? <CelebrationPage /> : <CountdownPage targetDate={BIRTHDAY} />}
    </>
  );
}
