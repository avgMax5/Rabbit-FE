import React, { useEffect, useState } from "react";

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
    twinkleSpeed: number;
    brightness: number;
}

interface ShootingStar {
    id: number;
    x: number;
    y: number;
    angle: number;
    speed: number;
    length: number;
    opacity: number;
    color: string;
}

interface StarryBackgroundProps {
    className?: string;
    starCount?: number;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({
    className = "",
    starCount = 200,
}) => {
    const [stars, setStars] = useState<Star[]>([]);
    const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

    // 별의 색상 팔레트 (이미지의 다양한 별 색상 참고)
    const starColors = [
        "#ffffff", // 흰색
        "#e6f3ff", // 연한 파란 흰색
        "#fff5e6", // 연한 주황 흰색
        "#f0f8ff", // 밝은 파란 흰색
        "#fffacd", // 연한 노란 흰색
        "#e6e6fa", // 연한 보라 흰색
        "#f5f5dc", // 베이지 흰색
        "#ffefd5", // 연한 복숭아 흰색
    ];

    useEffect(() => {
        const generateStars = (): Star[] => {
            const newStars: Star[] = [];

            for (let i = 0; i < starCount; i++) {
                // 별의 크기 분포 (작은 별이 많고, 큰 별은 적게)
                let size: number;
                const sizeRandom = Math.random();
                if (sizeRandom < 0.6) {
                    size = Math.random() * 0.5 + 0.3; // 작은 별 (0.3-0.8px)
                } else if (sizeRandom < 0.85) {
                    size = Math.random() * 1 + 0.8; // 중간 별 (0.8-1.8px)
                } else if (sizeRandom < 0.95) {
                    size = Math.random() * 1.5 + 1.8; // 큰 별 (1.8-3.3px)
                } else {
                    size = Math.random() * 2 + 3.3; // 매우 큰 별 (3.3-5.3px)
                }

                const star: Star = {
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: size,
                    color: starColors[
                        Math.floor(Math.random() * starColors.length)
                    ],
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkleSpeed: Math.random() * 3 + 1, // 1-4초 사이클
                    brightness: Math.random() * 0.5 + 0.5, // 기본 밝기
                };

                newStars.push(star);
            }

            return newStars;
        };

        const generateShootingStar = (): ShootingStar => {
            const shootingStarColors = [
                "#ffffff",
                "#e6f3ff",
                "#fff5e6",
                "#f0f8ff",
            ];
            return {
                id: Math.random(),
                x: -15,
                y: Math.random() * 70, // 화면 상단 70%에서 시작
                angle: Math.random() * 25 + 20, // 20-45도 각도
                speed: Math.random() * 2 + 3, // 3-5 속도
                length: Math.random() * 80 + 80, // 80-160px 꼬리 길이 (더 길게)
                opacity: Math.random() * 0.3 + 0.7, // 0.7-1.0 (더 밝게)
                color: shootingStarColors[
                    Math.floor(Math.random() * shootingStarColors.length)
                ],
            };
        };

        setStars(generateStars());

        // 별똥별 주기적 생성
        const shootingStarInterval = setInterval(() => {
            if (Math.random() < 0.8) {
                // 80% 확률로 증가
                const newShootingStar = generateShootingStar();
                setShootingStars((prev) => [...prev, newShootingStar]);

                // 별똥별 애니메이션 후 제거
                setTimeout(() => {
                    setShootingStars((prev) =>
                        prev.filter((s) => s.id !== newShootingStar.id)
                    );
                }, 4000); // 4초로 증가
            }
        }, 1500); // 1.5초마다 체크로 더 자주

        return () => clearInterval(shootingStarInterval);
    }, [starCount]);

    return (
        <div
            className={`fixed inset-0 overflow-hidden ${className}`}
            style={{
                background: `
          radial-gradient(ellipse at top left, rgba(0, 0, 70, 0.3) 0%, rgba(28, 181, 224, 0.2) 40%, rgba(0, 0, 70, 0.4) 70%),
          radial-gradient(ellipse at bottom right, rgba(28, 181, 224, 0.2) 0%, rgba(0, 0, 70, 0.3) 25%, rgba(0, 0, 37, 0.5) 50%),
          rgba(0, 0, 37, 0.6)
        `,
            }}
        >
            {/* 별똥별 */}
            {shootingStars.map((shootingStar) => (
                <div
                    key={shootingStar.id}
                    className="absolute"
                    style={{
                        left: `${shootingStar.x}%`,
                        top: `${shootingStar.y}%`,
                        width: `${shootingStar.length}px`,
                        height: "3px", // 두께 증가
                        background: `linear-gradient(to right, 
              ${shootingStar.color} 0%, 
              ${shootingStar.color}90 30%, 
              ${shootingStar.color}60 70%, 
              transparent 100%)`,
                        transform: `rotate(${shootingStar.angle}deg)`,
                        transformOrigin: "left center",
                        opacity: shootingStar.opacity,
                        filter: "blur(0.3px)", // 블러 감소
                        boxShadow: `0 0 8px ${shootingStar.color}, 0 0 16px ${shootingStar.color}80, 0 0 24px ${shootingStar.color}40`,
                        animation: `shootingStar-${shootingStar.id} 4s linear forwards`,
                        zIndex: 5,
                    }}
                />
            ))}

            {/* 별들 */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full animate-pulse"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        backgroundColor: star.color,
                        opacity: star.opacity,
                        boxShadow: `
              0 0 ${star.size * 2}px ${star.color}40,
              0 0 ${star.size * 4}px ${star.color}20,
              0 0 ${star.size * 6}px ${star.color}10
            `,
                        animation: `twinkle-${star.id} ${star.twinkleSpeed}s ease-in-out infinite alternate`,
                    }}
                />
            ))}

            {/* 큰 별들의 마름모꼴 광선 효과 */}
            {stars
                .filter((star) => star.size > 2.5)
                .map((star) => (
                    <div
                        key={`diamond-${star.id}`}
                        className="absolute"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            transform: "translate(-50%, -50%)",
                            width: 0,
                            height: 0,
                        }}
                    >
                        {/* 마름모 형태의 광선 */}
                        <div
                            className="absolute"
                            style={{
                                width: `${star.size * 2}px`,
                                height: `${star.size * 2}px`,
                                left: "50%",
                                top: "50%",
                                transform:
                                    "translate(-50%, -50%) rotate(45deg)",
                                transformOrigin: "center center",
                                background: `linear-gradient(to top, 
                transparent 0%, 
                ${star.color}20 25%, 
                ${star.color}80 50%, 
                ${star.color}20 75%, 
                transparent 100%)`,
                                clipPath:
                                    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                                filter: "blur(0.3px)",
                                animation: `twinkle-${star.id} ${star.twinkleSpeed}s ease-in-out infinite alternate`,
                            }}
                        />
                        {/* 두 번째 마름모 (교차) */}
                        <div
                            className="absolute"
                            style={{
                                width: `${star.size * 1.5}px`,
                                height: `${star.size * 1.5}px`,
                                left: "50%",
                                top: "50%",
                                transform:
                                    "translate(-50%, -50%) rotate(-45deg)",
                                transformOrigin: "center center",
                                background: `linear-gradient(to top, 
                transparent 0%, 
                ${star.color}30 30%, 
                ${star.color}90 50%, 
                ${star.color}30 70%, 
                transparent 100%)`,
                                clipPath:
                                    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                                filter: "blur(0.3px)",
                                animation: `twinkle-${star.id} ${star.twinkleSpeed}s ease-in-out infinite alternate`,
                            }}
                        />
                        {/* 추가 글로우 효과 */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: `${star.size * 2.5}px`,
                                height: `${star.size * 2.5}px`,
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                transformOrigin: "center center",
                                background: `radial-gradient(circle, ${star.color}40 0%, ${star.color}20 40%, transparent 70%)`,
                                filter: "blur(1px)",
                                animation: `twinkle-${star.id} ${star.twinkleSpeed}s ease-in-out infinite alternate`,
                            }}
                        />
                    </div>
                ))}

            {/* 동적 애니메이션을 위한 스타일 */}
            <style jsx>{`
                ${stars
                    .map(
                        (star) => `
          @keyframes twinkle-${star.id} {
            0% { 
              opacity: ${star.opacity * 0.3}; 
              transform: scale(0.8);
            }
            50% { 
              opacity: ${star.opacity}; 
              transform: scale(1);
            }
            100% { 
              opacity: ${star.opacity * 1.2}; 
              transform: scale(1.1);
            }
          }
        `
                    )
                    .join("")}
                ${shootingStars
                    .map(
                        (shootingStar) => `
          @keyframes shootingStar-${shootingStar.id} {
            0% { 
              left: -15%;
              opacity: 0;
              transform: rotate(${shootingStar.angle}deg) scale(0.5);
            }
            5% {
              opacity: ${shootingStar.opacity};
              transform: rotate(${shootingStar.angle}deg) scale(1);
            }
            95% {
              opacity: ${shootingStar.opacity * 0.3};
              transform: rotate(${shootingStar.angle}deg) scale(0.8);
            }
            100% { 
              left: 130%;
              opacity: 0;
              transform: rotate(${shootingStar.angle}deg) scale(0.5);
            }
          }
        `
                    )
                    .join("")}
            `}</style>
        </div>
    );
};

export default StarryBackground;

// 사용 예제
// const App: React.FC = () => {
//   return (
//     <div
//       className="relative min-h-screen"
//       style={{
//         background: `
//           radial-gradient(ellipse at top left, #000046 0%, #B06AB3 30%, #1cb5e0 60%, #000046 90%),
//           radial-gradient(ellipse at bottom right, #1cb5e0 0%, #B06AB3 25%, #000046 50%, #000025 80%),
//           radial-gradient(circle at center, #B06AB3 0%, #1cb5e0 35%, #000046 70%),
//           radial-gradient(circle 800px at top left, transparent 40%, #B06AB3 45%, transparent 50%),
//           radial-gradient(circle 1200px at bottom right, transparent 35%, #1cb5e0 40%, transparent 45%),
//           radial-gradient(circle 600px at bottom left, transparent 50%, #000046 55%, transparent 60%),
//           linear-gradient(135deg, #000046 0%, #B06AB3 20%, #1cb5e0 40%, #B06AB3 60%, #000046 80%, #000025 100%)
//         `
//       }}
//     >
//       {/* 별이 반짝이는 배경 */}
//       <StarryBackground starCount={400} />

//       {/* 컨텐츠 */}
//       <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
//       </div>
//     </div>
//   );
// };

// export default App;
