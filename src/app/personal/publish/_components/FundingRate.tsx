'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

const FundingRate: React.FC = () => {
  const option = {
    backgroundColor: 'rgba(234, 234, 234, 0)',
    title: {
      text: '투자자 비율',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: '코인 이름',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: '민우핑' },
          { value: 310, name: '재웅핑' },
          { value: 274, name: '하진핑' },
          { value: 235, name: '호연핑' },
          { value: 400, name: '재환핑' }
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function () {
          return Math.random() * 200;
        }
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactECharts 
        option={option} 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default FundingRate;
