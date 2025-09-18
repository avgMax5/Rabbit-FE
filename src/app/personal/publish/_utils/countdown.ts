export const updateCountdown = (timeLeft: string | null, setCountdown: (value: string) => void) => {
  if (!timeLeft || timeLeft.trim() === '') {
    setCountdown('진행중');
    return;
  }

  try {
    let endTime: Date;
    
    // ISO 8601 형식 (2025-09-15T14:30:00) 또는 HH:MM:SS 형식 처리
    if (timeLeft.includes('T') || timeLeft.includes('-')) {
      // ISO 형식으로 파싱
      endTime = new Date(timeLeft);
      
      if (isNaN(endTime.getTime())) {
        setCountdown('진행중');
        return;
      }
    } else if (timeLeft.includes(':') && timeLeft.split(':').length === 3) {
      // HH:MM:SS 형식 처리
      const [hours, minutes, seconds] = timeLeft.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        setCountdown('진행중');
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
      endTime = new Date(timeLeft);
      
      if (isNaN(endTime.getTime())) {
        setCountdown('진행중');
        return;
      }
    }
    
    const now = new Date();
    const timeDiff = endTime.getTime() - now.getTime();

    if (timeDiff <= 0) {
      setCountdown('마감됨');
      return;
    }

    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    setCountdown(`${totalHours}시간 ${minutes}분 ${seconds}초`);
  } catch (error) {
    console.error('카운트다운 계산 오류:', error);
    setCountdown('진행중');
  }
};
