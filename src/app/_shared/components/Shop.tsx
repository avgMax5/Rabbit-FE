import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useUserStore } from '../../_store/userStore';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const bounce = keyframes`
  0%, 50%, 80%, 100% {
    transform: translate3d(0,-4px,0);
  }
  70% {
    transform: translate3d(0,-10px,0);
  }
  90% {
    transform: translate3d(0,-6px,0);
  }
`;

const goldShimmer = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: linear-gradient(135deg, #164E79 0%, #031D31 100%);
  border-radius: 10px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    inset 8px 8px 8px rgba(136, 135, 135, 0.2),
    inset -8px -8px 8px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 20vh;
  left: 50% - 240px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #FEE2A7;
  box-shadow: inset -0.125rem -0.25rem 0.625rem #FFC54A, inset 0.125rem 0.125rem 0.125rem #fffbf2, 0.125rem 0.0625rem 0.25rem rgba(254, 226, 167, 0.3);
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #FFA629;
  
  &:hover {
    background: #ffed4e;
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  color: #ffffff;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: var(--font-nanum-square);
  font-weight: 900;
`;

const CarrotIcon = styled.img`
  width: 4rem;
  height: 4rem;
  position: relative;
  animation: ${bounce} 2s infinite;
`;

const CarrotBalance = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: linear-gradient(90deg, #F4E4BC,rgb(231, 208, 149),rgb(240, 220, 172), #E6D3A3, #F4E4BC);
  background-size: 200% 100%;
  animation: ${goldShimmer} 8s linear infinite;
  border-radius: 0.5rem;
  border: 1px solid rgba(230, 211, 163, 0.7);
  box-shadow: 
    0 8px 32px rgba(230, 211, 163, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset 0 -1px 0 rgba(230, 211, 163, 0.5);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
  }
`;

const BalanceLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CarrotIconSmall = styled.img`
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 0 8px rgba(255, 165, 0, 0.4));
`;

const BalanceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: var(--font-nanum-square);
`;

const BalanceLabel = styled.span`
  color: rgba(62, 27, 0, 0.7);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: var(--font-nanum-square);
`;

const BalanceAmount = styled.span`
  color:rgb(114, 60, 19);
  font-size: 20px;
  font-weight: 700;
  font-family: var(--font-nanum-square);
  font-weight: 900;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const CurrencySymbol = styled.span`
  color: #3e1b00;
  font-size: 16px;
  font-weight: 600;
  margin-left: 4px;
  opacity: 0.8;
`;


const TabContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const TabSlider = styled.div<{ $activeIndex: number }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(25% - 3px);
  height: calc(100% - 8px);
  background: linear-gradient(135deg, #164E79, #031D31);
  border-radius: 8px;
  transition: transform 0.3s ease;
  transform: translateX(${({ $activeIndex }) => $activeIndex * 100}%);
`;

const Tab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;
  background: transparent;
  color: ${({ $active }) => $active ? 'white' : '#64748b'};
  position: relative;
  z-index: 1;

  &:hover {
    color: ${({ $active }) => $active ? 'white' : '#031D31'};
  }
`;

const ItemGrid = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 20px;
`;

const ItemCard = styled.div`
  background: linear-gradient(135deg, #e7e7e7, #f8fafc);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.05),
    inset 2px 2px 4px rgba(255, 255, 255, 0.8),
    inset -2px -2px 4px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
  font-family: var(--font-nanum-square);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.1),
      inset 2px 2px 4px rgba(255, 255, 255, 0.9),
      inset -2px -2px 4px rgba(0, 0, 0, 0.4);
    border-color: rgba(59, 130, 246, 0.2);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CurrencyIcon = styled.div`
  width: 32px;
  height: 32px;
  background: rgba(16, 185, 129, 0.3);
  border-radius: 8px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
  font-size: 16px;
`;

const TicketIcon = styled.div`
  width: 32px;
  height: 32px;
  background: rgba(184, 227, 255, 0.5);
  border-radius: 8px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
  font-size: 16px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  margin: 0 0 8px 0;
  color: #1e293b;
  font-size: 18px;
  font-weight: 800;
`;

const ItemPrice = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 14px;
`;

const DiscountPrice = styled.span`
  color: #ef4444;
  font-weight: 800;
  margin-right: 8px;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #94a3b8;
  font-weight: 600;
`;

const PurchaseButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #ffd49a, #ffa34e);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  color: #3e1b00;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #ffd49a, #ffd49a);
    transition: all 0.3s ease;
  }

  &:active {
    transform: translateY(0);
  }
`;

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 메인 컴포넌트
const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'tickets' | 'gift'>('buy');
  const { user, isLoading } = useUserStore();

  const getActiveIndex = () => {
    switch (activeTab) {
      case 'buy': return 0;
      case 'sell': return 1;
      case 'tickets': return 2;
      case 'gift': return 3;
      default: return 0;
    }
  };

  const buyOptions = [
    {
      id: 1,
      name: '5천만 캐럿',
      price: '5,000₩',
      carrot: '5,000만C',
      isDiscount: false
    },
    {
      id: 2,
      name: '1억 캐럿',
      price: '9,900₩',
      originalPrice: '10,000₩',
      carrot: '1억C',
      isDiscount: true
    },
    {
      id: 3,
      name: '2억 캐럿',
      price: '19,500₩',
      originalPrice: '20,000₩',
      carrot: '2억C',
      isDiscount: true
    }
  ];

  const sellOptions = [
    {
      id: 1,
      name: '1억 캐럿 환전',
      carrot: '1억C',
      price: '1만₩'
    },
    {
      id: 2,
      name: '2억 캐럿 환전',
      carrot: '2억C',
      price: '2만₩'
    },
    {
      id: 3,
      name: '3억 캐럿 환전',
      carrot: '3억C',
      price: '3만₩'
    }
  ];

  const ticketOptions = [
    {
      id: 1,
      name: '인프콘 티켓',
      price: '3억C',
      description: '인프랩 개발자 컨퍼런스 티켓'
    },
    {
      id: 2,
      name: 'ifkakao 티켓',
      price: '3억C',
      description: '카카오 개발자 컨퍼런스 티켓'
    }
  ];

  const giftOptions = [
    {
      id: 1,
      name: '스타벅스 아메리카노 T',
      price: '4,500만C'
    },
    {
      id: 2,
      name: '배달의민족 2만원권',
      price: '1억9천만C'
    },
    {
      id: 3,
      name: '교촌치킨 허니콤보',
      price: '2억2천만C'
    }
  ];

  const handlePurchase = (item: any) => {
    alert(`${item.name} 구매가 완료되었습니다!`);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          X
        </CloseButton>
        
        <Title>
            <CarrotIcon src="/images/personal/home/carrot.png" alt="당근" />
            캐럿 상점
            <CarrotIcon src="/images/personal/home/carrot.png" alt="당근" />
        </Title>

        <CarrotBalance>
          <BalanceLeft>
            <CarrotIconSmall src="/images/personal/home/carrot.png" alt="당근" />
            <BalanceInfo>
              <BalanceLabel>보유 캐럿</BalanceLabel>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <BalanceAmount>
                  {isLoading ? '...' : user?.carrot ? Number(user.carrot).toLocaleString() : '0'}
                </BalanceAmount>
                <CurrencySymbol>C</CurrencySymbol>
              </div>
            </BalanceInfo>
          </BalanceLeft>
        </CarrotBalance>

        <TabContainer>
          <TabSlider $activeIndex={getActiveIndex()} />
          <Tab 
            $active={activeTab === 'buy'}
            onClick={() => setActiveTab('buy')}
          >
            캐럿 구매
          </Tab>
          <Tab 
            $active={activeTab === 'sell'}
            onClick={() => setActiveTab('sell')}
          >
            캐럿 환전
          </Tab>
          <Tab 
            $active={activeTab === 'tickets'}
            onClick={() => setActiveTab('tickets')}
          >
            티켓 구매
          </Tab>
          <Tab 
            $active={activeTab === 'gift'}
            onClick={() => setActiveTab('gift')}
          >
            기프티콘샵
          </Tab>
        </TabContainer>

        <ItemGrid>
          {activeTab === 'buy' && buyOptions.map(item => (
            <ItemCard key={item.id}>
              <IconWrapper>
                <CurrencyIcon>🥕</CurrencyIcon>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>
                    {item.isDiscount ? (
                      <>
                        <DiscountPrice>{item.price}</DiscountPrice>
                        <OriginalPrice>{item.originalPrice}</OriginalPrice>
                      </>
                    ) : (
                      item.price
                    )}
                  </ItemPrice>
                </ItemInfo>
              </IconWrapper>
              <PurchaseButton onClick={() => handlePurchase(item)}>
                구매하기
              </PurchaseButton>
            </ItemCard>
          ))}

          {activeTab === 'sell' && sellOptions.map(item => (
            <ItemCard key={item.id}>
              <IconWrapper>
                <CurrencyIcon>💰</CurrencyIcon>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>{item.carrot} → {item.price}</ItemPrice>
                </ItemInfo>
              </IconWrapper>
              <PurchaseButton onClick={() => handlePurchase(item)}>
                환전하기
              </PurchaseButton>
            </ItemCard>
          ))}

          {activeTab === 'tickets' && ticketOptions.map(item => (
            <ItemCard key={item.id}>
              <IconWrapper>
                <TicketIcon>🎫</TicketIcon>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>{item.description} - {item.price}</ItemPrice>
                </ItemInfo>
              </IconWrapper>
              <PurchaseButton onClick={() => handlePurchase(item)}>
                구매하기
              </PurchaseButton>
            </ItemCard>
          ))}

          {activeTab === 'gift' && giftOptions.map(item => (
            <ItemCard key={item.id}>
              <IconWrapper>
                <TicketIcon>🎁</TicketIcon>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>{item.price}</ItemPrice>
                </ItemInfo>
              </IconWrapper>
              <PurchaseButton onClick={() => handlePurchase(item)}>
                구매하기
              </PurchaseButton>
            </ItemCard>
          ))}
        </ItemGrid>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ShopModal;