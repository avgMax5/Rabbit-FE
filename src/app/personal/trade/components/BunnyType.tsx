import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PentagonRadarChart = ({ 
  data = [
    {
      value: [4200, 3000, 20000, 35000, 50000],
      name: '예산 할당',
      color: '#667eea'
    },
    {
      value: [5000, 14000, 28000, 26000, 42000],
      name: '실제 지출',
      color: '#764ba2'
    }
  ],
  indicators = [
    { name: '영업', max: 6500 },
    { name: '관리', max: 16000 },
    { name: 'IT', max: 30000 },
    { name: '고객지원', max: 38000 },
    { name: '개발', max: 52000 }
  ],
  width = 600,
  height = 400,
  showLegend = true,
  animationDuration = 1500
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 기존 차트 인스턴스가 있으면 dispose
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    // 새 차트 인스턴스 생성
    chartInstance.current = echarts.init(chartRef.current);

    const option = {
      legend: showLegend ? {
        data: data.map(item => item.name),
        bottom: 10,
        textStyle: {
          color: '#34495e',
          fontSize: 12
        }
      } : false,
      radar: {
        indicator: indicators,
        shape: 'polygon',
        splitNumber: 4,
        center: ['50%', '50%'],
        radius: '70%',
        axisName: {
          color: '#34495e',
          fontSize: 12,
          fontWeight: 'bold'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(52, 73, 94, 0.3)',
            width: 1
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              'rgba(102, 126, 234, 0.05)',
              'rgba(118, 75, 162, 0.05)',
              'rgba(102, 126, 234, 0.03)',
              'rgba(118, 75, 162, 0.03)'
            ]
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(52, 73, 94, 0.4)',
            width: 1
          }
        }
      },
      series: [
        {
          name: 'Pentagon Radar',
          type: 'radar',
          emphasis: {
            lineStyle: {
              width: 3
            }
          },
          data: data.map(item => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: item.color
            },
            lineStyle: {
              color: item.color,
              width: 2
            },
            areaStyle: {
              color: item.color.includes('#') 
                ? `${item.color}40` 
                : `rgba(${item.color}, 0.25)`
            }
          })),
          animationDuration: animationDuration,
          animationEasing: 'elasticOut'
        }
      ],
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        formatter: function(params: any) {
          const indicatorNames = indicators.map(ind => ind.name);
          let result = `<strong>${params.name}</strong><br/>`;
          params.value.forEach((value: number, index: number) => {
            result += `${indicatorNames[index]}: ${value.toLocaleString()}<br/>`;
          });
          return result;
        }
      }
    };

    chartInstance.current.setOption(option);

    // 반응형 처리
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [data, indicators, width, height, showLegend, animationDuration]);

  return (
    <div 
      ref={chartRef} 
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        margin: '0 auto'
      }} 
    />
  );
};

// 사용 예시 컴포넌트
const App = () => {
  // 샘플 데이터
  const sampleData = [
    {
      value: [4200, 3000, 20000, 35000, 50000],
      name: '예산 할당',
      color: '#667eea'
    },
    {
      value: [5000, 14000, 28000, 26000, 42000],
      name: '실제 지출',
      color: '#764ba2'
    }
  ];

  const indicators = [
    { name: '영업', max: 6500 },
    { name: '관리', max: 16000 },
    { name: 'IT', max: 30000 },
    { name: '고객지원', max: 38000 },
    { name: '개발', max: 52000 }
  ];

  return (
    <div style={{ 
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>
        Pentagon Radar Chart Component
      </h2>
      
      <PentagonRadarChart 
        data={sampleData}
        indicators={indicators}
        width={600}
        height={400}
        showLegend={true}
        animationDuration={1500}
      />
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#6c757d',
        maxWidth: '600px'
      }}>
        <h4 style={{ marginTop: 0, color: '#495057' }}>사용법:</h4>
        <p style={{ margin: '5px 0' }}>
          • <strong>data</strong>: 차트에 표시할 데이터 배열
        </p>
        <p style={{ margin: '5px 0' }}>
          • <strong>indicators</strong>: 각 축의 이름과 최대값 설정
        </p>
        <p style={{ margin: '5px 0' }}>
          • <strong>width/height</strong>: 차트 크기 조정
        </p>
        <p style={{ margin: '5px 0' }}>
          • <strong>showLegend</strong>: 범례 표시 여부
        </p>
      </div>
    </div>
  );
};

export default App;