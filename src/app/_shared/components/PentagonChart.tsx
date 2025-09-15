"use client";
import React, { useEffect, useRef } from 'react';

const PentagonChart = () => {
  const chartRef = useRef(null);

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
  }, []);

  const initChart = () => {
    if (!chartRef.current || !window.echarts) return;

    const myChart = window.echarts.init(chartRef.current);
    
    const option = {
      radar: {
        indicator: [
          { name: '성장형', max: 100 },
          { name: '밸런스형', max: 100 },
          { name: '인기형', max: 100 },
          { name: '가치형', max: 100 },
          { name: '안정형', max: 100 }
        ],
        center: ['50%', '50%'],
        radius: '65%',
        axisName: {
          color: '#fff',
          fontSize: 10,
          fontWeight: 'bold'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
            width: 1
          }
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(255, 255, 255, 0.05)', 'transparent'],
            opacity: 0.3
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.4)'
          }
        }
      },
      series: [{
        name: '능력 지표',
        type: 'radar',
        data: [
          {
            value: [75, 82, 68, 55, 90],
            name: '능력 지표',
            symbol: 'circle',
            symbolSize: 4,
            lineStyle: {
              color: '#FFD700',
              width: 2
            },
            areaStyle: {
              color: 'rgba(255, 215, 0, 0.2)'
            },
            itemStyle: {
              color: '#FFD700'
            }
          }
        ]
      }]
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
    <div 
      ref={chartRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: '150px'
      }}
    />
  );
};

export default PentagonChart;
