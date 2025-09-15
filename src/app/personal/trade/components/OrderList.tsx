"use client";
import styled from "styled-components";

interface OrderItem {
  id: number;
  badgeNumber: number;
  badgeColor: string;
  price: string;
  changeRate: string;
  changeColor: string;
}

const mockOrderData: OrderItem[] = [
  {
    id: 1,
    badgeNumber: 20,
    badgeColor: "#e74c3c",
    price: "300,200",
    changeRate: "+1.00%",
    changeColor: "#ff4444"
  },
  {
    id: 2,
    badgeNumber: 20,
    badgeColor: "#4a90e2",
    price: "250,000",
    changeRate: "-0.50%",
    changeColor: "#00aa44"
  },
  {
    id: 3,
    badgeNumber: 15,
    badgeColor: "#e74c3c",
    price: "180,500",
    changeRate: "+2.30%",
    changeColor: "#ff4444"
  },
  {
    id: 4,
    badgeNumber: 8,
    badgeColor: "#4a90e2",
    price: "95,000",
    changeRate: "-1.20%",
    changeColor: "#00aa44"
  }
];

export default function OrderList() {
  return (
    <OrderListContainer>
      <OrderListHeader>
        <HeaderTitle>주문 목록</HeaderTitle>
        <HeaderSubtitle>실시간 거래 내역</HeaderSubtitle>
      </OrderListHeader>
      
      <OrderItemsContainer>
        {mockOrderData.map((item) => (
           <OrderItem key={item.id}>
             <OrderItemLeft>
               <OrderBar $backgroundColor={item.badgeColor} $width={item.badgeNumber}>
                 {item.badgeNumber}
               </OrderBar>
               <OrderChange $color={item.changeColor}>
                 {item.changeRate}
               </OrderChange>
             </OrderItemLeft>
             
             <OrderItemRight>
               <OrderPrice>{item.price}</OrderPrice>
             </OrderItemRight>
           </OrderItem>
        ))}
      </OrderItemsContainer>
    </OrderListContainer>
  );
}

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const OrderListHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeaderTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #FAE7C1;
  margin: 0;
`;

const HeaderSubtitle = styled.p`
  font-size: 0.75rem;
  color: #E2E2E2;
  margin: 0;
`;

const OrderItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const OrderItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
`;

const OrderItemRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OrderBar = styled.div<{ $backgroundColor: string; $width: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: ${({ $width }) => $width * 8}px;
  min-width: 40px;
  max-width: 200px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 0.75rem;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const OrderPrice = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  color: #FAE7C1;
`;

const OrderChange = styled.span<{ $color: string }>`
  font-size: 0.75rem;
  font-weight: bold;
  color: ${({ $color }) => $color};
`;
