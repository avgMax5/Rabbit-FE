import { useState, useEffect } from 'react';

interface CountdownResult {
  timeLeft: string;
  isUrgent: boolean; // 24시간 이내인지 여부
  isExpired: boolean; // 만료되었는지 여부
}

export const useCountdown = (endAt: string | null): CountdownResult => {
  const [countdown, setCountdown] = useState<CountdownResult>({
    timeLeft: '',
    isUrgent: false,
    isExpired: false,
  });

  useEffect(() => {
    if (!endAt || endAt.trim() === '') {
      setCountdown({
        timeLeft: '진행중',
        isUrgent: false,
        isExpired: false,
      });
      return;
    }

    const updateCountdown = () => {
      try {
        let endTime: Date;

        // ISO 8601 형식 (2025-09-15T14:30:00) 또는 HH:MM:SS 형식 처리
        if (endAt.includes('T') || endAt.includes('-')) {
          // ISO 형식으로 파싱
          endTime = new Date(endAt);

          if (isNaN(endTime.getTime())) {
            setCountdown({
              timeLeft: '진행중',
              isUrgent: false,
              isExpired: false,
            });
            return;
          }
        } else if (endAt.includes(':') && endAt.split(':').length === 3) {
          // HH:MM:SS 형식 처리
          const [hours, minutes, seconds] = endAt.split(':').map(Number);

          if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            setCountdown({
              timeLeft: '진행중',
              isUrgent: false,
              isExpired: false,
            });
            return;
          }

          endTime = new Date();
          endTime.setHours(hours, minutes, seconds, 0);

          const now = new Date();
          if (endTime <= now) {
            endTime.setDate(endTime.getDate() + 1);
          }
        } else {
          // 기타 형식 시도
          endTime = new Date(endAt);

          if (isNaN(endTime.getTime())) {
            setCountdown({
              timeLeft: '진행중',
              isUrgent: false,
              isExpired: false,
            });
            return;
          }
        }

        const now = new Date();
        const timeDiff = endTime.getTime() - now.getTime();

        if (timeDiff <= 0) {
          setCountdown({
            timeLeft: '마감됨',
            isUrgent: false,
            isExpired: true,
          });
          return;
        }

        const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        const formattedHours = totalHours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        const timeLeftString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        const isUrgent = totalHours < 24; // 24시간 이내

        setCountdown({
          timeLeft: timeLeftString,
          isUrgent,
          isExpired: false,
        });
      } catch (error) {
        console.error('카운트다운 계산 오류:', error);
        setCountdown({
          timeLeft: '진행중',
          isUrgent: false,
          isExpired: false,
        });
      }
    };

    // 초기 실행
    updateCountdown();

    // 1초마다 업데이트
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [endAt]);

  return countdown;
};
