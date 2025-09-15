"use client";
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Chart = () => {
  const chartRef = useRef(null);
  const [activePeriod, setActivePeriod] = useState('일');

  useEffect(() => {
    if (!window.echarts) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js';
      script.onload = () => {
        initChart();
      };
      document.head.appendChild(script);
    } else {
      initChart();
    }

    return () => {
      if (chartRef.current && window.echarts) {
        window.echarts.dispose(chartRef.current);
      }
    };
  }, [activePeriod]);

  const getChartData = (period: string) => {
    switch (period) {
      case '일':
        return {
          xData: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
          yData: [120, 180, 150, 220, 190, 250, 200]
        };
      case '주':
        return {
          xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          yData: [150, 230, 224, 218, 135, 147, 260]
        };
      case '월':
        return {
          xData: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
          yData: [200, 180, 250, 300, 280, 320, 350]
        };
      default:
        return {
          xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          yData: [150, 230, 224, 218, 135, 147, 260]
        };
    }
  };

  const initChart = () => {
    if (!chartRef.current || !window.echarts) return;

    const myChart = window.echarts.init(chartRef.current);
    const chartData = getChartData(activePeriod);
    
    const option = {
      xAxis: {
        type: 'category',
        data: chartData.xData,
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 10
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 10
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        top: '20%',
        bottom: '15%',
        containLabel: true
      },
      series: [
        {
          data: chartData.yData,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#FFD700',
            width: 2
          },
          itemStyle: {
            color: '#FFD700'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(255, 215, 0, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(255, 215, 0, 0.05)'
                }
              ]
            }
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#FFD700',
        textStyle: {
          color: '#fff'
        }
      }
    };

    myChart.setOption(option);

    // 반응형 처리
    const handleResize = () => {
      myChart.resize();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  return (
    <ChartContainer>
      <ButtonContainer>
        <PeriodButton 
          $active={activePeriod === '일'} 
          onClick={() => setActivePeriod('일')}
        >
          일
        </PeriodButton>
        <PeriodButton 
          $active={activePeriod === '주'} 
          onClick={() => setActivePeriod('주')}
        >
          주
        </PeriodButton>
        <PeriodButton 
          $active={activePeriod === '월'} 
          onClick={() => setActivePeriod('월')}
        >
          월
        </PeriodButton>
      </ButtonContainer>
      <div 
        ref={chartRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          minHeight: '200px'
        }}
      />
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
`;

const PeriodButton = styled.button<{ $active: boolean }>`
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${({ $active }) => 
    $active 
      ? `
        background-color: #FFD700;
        color: #333;
        box-shadow: 0 2px 4px rgba(255, 215, 0, 0.3);
      `
      : `
        background-color: rgba(255, 255, 255, 0.2);
        color: #fff;
        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `
  }
`;

export default Chart;
