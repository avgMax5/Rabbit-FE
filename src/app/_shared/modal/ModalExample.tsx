'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import ConfirmModal from './Confirm';
import ResultModal from './Result';
import Button from '../components/Button';

export default function ModalExample() {
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    variant: 'primary' as 'primary' | 'danger'
  });
  
  const [resultModal, setResultModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteConfirm = () => {
    setConfirmModal({
      isOpen: true,
      title: '삭제 확인',
      message: '정말로 이 항목을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.',
      variant: 'danger'
    });
  };

  const handleSaveConfirm = () => {
    setConfirmModal({
      isOpen: true,
      title: '저장 확인',
      message: '변경사항을 저장하시겠습니까?',
      variant: 'primary'
    });
  };

  const handleConfirmAction = async () => {
    setIsLoading(true);
    
    // API 호출 시뮬레이션
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 성공 시뮬레이션 (랜덤하게 성공/실패)
      const isSuccess = Math.random() > 0.3;
      
      setResultModal({
        isOpen: true,
        type: isSuccess ? 'success' : 'error',
        title: isSuccess ? '성공!' : '실패',
        message: isSuccess 
          ? '요청이 성공적으로 처리되었습니다.' 
          : '요청 처리 중 오류가 발생했습니다.\n다시 시도해주세요.'
      });
    } catch (error) {
      setResultModal({
        isOpen: true,
        type: 'error',
        title: '오류 발생',
        message: '예상치 못한 오류가 발생했습니다.'
      });
    } finally {
      setIsLoading(false);
      setConfirmModal(prev => ({ ...prev, isOpen: false }));
    }
  };

  const handleCloseConfirm = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
    setIsLoading(false);
  };

  const handleCloseResult = () => {
    setResultModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <Container>
      <Title>모달 컴포넌트 예시</Title>
      
      <ButtonGroup>
        <Button 
          variant="primary" 
          size="large" 
          onClick={handleSaveConfirm}
        >
          저장 확인 모달
        </Button>
        
        <Button 
          variant="danger" 
          size="large" 
          onClick={handleDeleteConfirm}
        >
          삭제 확인 모달
        </Button>
      </ButtonGroup>

      <Description>
        <h3>사용법:</h3>
        <ul>
          <li><strong>ConfirmModal:</strong> 사용자에게 작업을 확인받을 때 사용</li>
          <li><strong>ResultModal:</strong> API 요청 결과를 표시할 때 사용</li>
          <li>모달 외부 클릭 시 닫힘 (로딩 중에는 닫히지 않음)</li>
          <li>ESC 키로 닫기 기능 추가 가능</li>
        </ul>
      </Description>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmAction}
        title={confirmModal.title}
        message={confirmModal.message}
        variant={confirmModal.variant}
        isLoading={isLoading}
        confirmText={confirmModal.variant === 'danger' ? '삭제' : '저장'}
        cancelText="취소"
      />

      <ResultModal
        isOpen={resultModal.isOpen}
        onClose={handleCloseResult}
        type={resultModal.type}
        title={resultModal.title}
        message={resultModal.message}
        buttonText="확인"
      />
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const Description = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #007bff;
  
  h3 {
    color: #333;
    margin-bottom: 12px;
    font-size: 18px;
  }
  
  ul {
    color: #666;
    line-height: 1.6;
    
    li {
      margin-bottom: 8px;
      
      strong {
        color: #333;
      }
    }
  }
`;
