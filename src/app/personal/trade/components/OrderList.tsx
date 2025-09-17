"use client";
import styled from "styled-components";

interface OrderItem {
  id: number;
  quantity: number;
  price: string;
  changeRate: string;
  order_type: 'BUY' | 'SELL';
}

interface OrderHistoryItem {
  id: number;
  orderTime: string; // 주문시간
  orderType: 'BUY' | 'SELL'; // 주문 유형
  quantity: number; // 수량
  unitPrice: string; // 단가
  settlementAmount: string; // 정산금액
}

interface OrderListProps {
  activeOrderTab: string;
  setActiveOrderTab: (tab: string) => void;
}

const mockOrderData: OrderItem[] = [
  {
    id: 1,
    quantity: 100,
    price: "300,200",
    changeRate: "+1.00%",
    order_type: "BUY"
  },
  {
    id: 2,
    quantity: 50,
    price: "250,000",
    changeRate: "-0.50%",
    order_type: "SELL"
  },
  {
    id: 3,
    quantity: 45,
    price: "180,500",
    changeRate: "+2.30%",
    order_type: "BUY"
  },
  {
    id: 4,
    quantity: 30,
    price: "95,000",
    changeRate: "-1.20%",
    order_type: "SELL"
  }
];

const mockOrderHistoryData: OrderHistoryItem[] = [
  {
    id: 1,
    orderTime: "14:30:25",
    orderType: "BUY",
    quantity: 100,
    unitPrice: "300,200",
    settlementAmount: "30,020,000"
  },
  {
    id: 2,
    orderTime: "14:25:10",
    orderType: "SELL",
    quantity: 50,
    unitPrice: "250,000",
    settlementAmount: "12,500,000"
  },
  {
    id: 3,
    orderTime: "14:20:45",
    orderType: "BUY",
    quantity: 45,
    unitPrice: "180,500",
    settlementAmount: "8,122,500"
  },
  {
    id: 4,
    orderTime: "14:15:30",
    orderType: "SELL",
    quantity: 30,
    unitPrice: "95,000",
    settlementAmount: "2,850,000"
  },
  {
    id: 5,
    orderTime: "14:10:15",
    orderType: "BUY",
    quantity: 75,
    unitPrice: "320,000",
    settlementAmount: "24,000,000"
  },
  {
    id: 6,
    orderTime: "14:05:42",
    orderType: "SELL",
    quantity: 25,
    unitPrice: "150,000",
    settlementAmount: "3,750,000"
  },
  {
    id: 7,
    orderTime: "14:00:18",
    orderType: "BUY",
    quantity: 60,
    unitPrice: "280,500",
    settlementAmount: "16,830,000"
  },
  {
    id: 8,
    orderTime: "13:55:33",
    orderType: "SELL",
    quantity: 40,
    unitPrice: "220,000",
    settlementAmount: "8,800,000"
  }
];

export default function OrderList({ activeOrderTab, setActiveOrderTab }: OrderListProps) {
  const maxQuantity = Math.max(...mockOrderData.map(item => item.quantity));
  
  const getQuantityPercentage = (quantity: number) => {
    return (quantity / maxQuantity) * 100;
  };

  return (
    <OrderListWrapper>
      <OrderTabContainer>
        <OrderTabButton 
          $active={activeOrderTab === '오더'}
          onClick={() => setActiveOrderTab('오더')}
        >
          오더
        </OrderTabButton>
        <OrderTabButton 
          $active={activeOrderTab === '오더 리스트'}
          onClick={() => setActiveOrderTab('오더 리스트')}
        >
          오더 리스트
        </OrderTabButton>
      </OrderTabContainer>
      
      <OrderArea>
        {activeOrderTab === '오더' ? (
          <OrderItemsContainer>
            {mockOrderData.map((item) => (
               <OrderItem key={item.id}>
                 <OrderLeftArea>
                   <OrderBar 
                     $orderType={item.order_type}
                     $widthPercentage={getQuantityPercentage(item.quantity)}
                   >
                     {item.quantity}
                   </OrderBar>
                 </OrderLeftArea>
                 <OrderRightArea>
                   <OrderPrice>{item.price}</OrderPrice>
                   <OrderChange>
                     {item.changeRate}
                   </OrderChange>
                 </OrderRightArea>
               </OrderItem>
            ))}
          </OrderItemsContainer>
        ) : (
          <OrderHistoryContainer>
            <OrderHistoryHeader>
              <HeaderCell>주문시간</HeaderCell>
              <HeaderCell>주문 유형</HeaderCell>
              <HeaderCell>수량</HeaderCell>
              <HeaderCell>단가</HeaderCell>
              <HeaderCell>정산금액</HeaderCell>
            </OrderHistoryHeader>
            {mockOrderHistoryData.map((item) => (
              <OrderHistoryItem key={item.id}>
                <HistoryCell>{item.orderTime}</HistoryCell>
                <HistoryCell>
                  <OrderTypeBadge $orderType={item.orderType}>
                    {item.orderType}
                  </OrderTypeBadge>
                </HistoryCell>
                <HistoryCell>{item.quantity}</HistoryCell>
                <HistoryCell>{item.unitPrice}</HistoryCell>
                <HistoryCell>{item.settlementAmount}</HistoryCell>
              </OrderHistoryItem>
            ))}
          </OrderHistoryContainer>
        )}
      </OrderArea>
    </OrderListWrapper>
  );
}

const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const OrderTabContainer = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const OrderTabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0.5rem 0.5rem 0 0;
  
  ${({ $active }) => {
    if ($active) {
      return `
        background-color: rgba(252, 252, 252, 0.34);
        color: #FAE7C1;
      `;
    } else {
      return `
        background-color: rgba(255, 255, 255, 0.56);
        color: #E2E2E2;
        &:hover {
          background-color: rgba(255, 255, 255, 0.7);
        }
      `;
    }
  }}
`;

const OrderArea = styled.div`
  flex: 1;
  background: rgba(252, 252, 252, 0.34);
  border-radius: 0 0 0.75rem 0.75rem;
  padding: 0;
  overflow: hidden;
`;

const OrderItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  gap: 0.5rem;
  padding: 0.5rem 0;
  background-color: rgba(255, 255, 255, 0.25);
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(252, 252, 252, 0.34);
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(252, 252, 252, 0.5);
  }
`;

const OrderLeftArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OrderRightArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const OrderBar = styled.div<{ $orderType: 'BUY' | 'SELL'; $widthPercentage: number }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 1.5rem;
  width: ${({ $widthPercentage }) => $widthPercentage}%;
  min-width: 2rem;
  padding: 0 0.5rem;
  background-color: ${({ $orderType }) => $orderType === 'BUY' ? '#e74c3c' : '#4a90e2'};
  border-radius: 0.25rem;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  transition: width 0.3s ease;
`;

const OrderPrice = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
`;

const OrderChange = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
`;

// Order History Styles
const OrderHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.25);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }
`;

const OrderHistoryHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr 1fr 1.2fr;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(252, 252, 252, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const OrderHistoryItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr 1fr 1.2fr;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(252, 252, 252, 0.3);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
`;

const HistoryCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #333;
`;

const OrderTypeBadge = styled.span<{ $orderType: 'BUY' | 'SELL' }>`
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  background-color: ${({ $orderType }) => $orderType === 'BUY' ? '#e74c3c' : '#4a90e2'};
  color: white;
`;

