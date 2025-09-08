import styled from 'styled-components';

interface TabButtonProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabButton({ activeTab, setActiveTab }: TabButtonProps) {

  return (
    <TabButtonContainer>
      <TabButtonItem 
        active={activeTab === 'personal'} 
        onClick={() => setActiveTab('personal')}
      >
        <TabButtonItemText active={activeTab === 'personal'}>
            개인 계정
        </TabButtonItemText>
      </TabButtonItem>
      <TabButtonItem 
        active={activeTab === 'corporate'} 
        onClick={() => setActiveTab('corporate')}
      >
        <TabButtonItemText active={activeTab === 'corporate'}>
            기업 계정
        </TabButtonItemText>
      </TabButtonItem>
    </TabButtonContainer>
  );
}

const TabButtonContainer = styled.div`
    width: 300px;
    height: 50px;
    display: flex;
    flex-direction: row;
    margin-top: 40px;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #E8F4FD 0%, #D1E7F5 100%);
    border-radius: 25px;
    padding: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const TabButtonItem = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
    flex: 1;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 21px;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    font-family: 'nanum-square';
    
    ${props => props.active ? `
        background: #F8B2A3;
        font-weight: 900;
        box-shadow: inset -2px -4px 10px rgba(215, 101, 77, 0.5), inset 6px 4px 10px #ffd6cd, 4px 4px 10px rgba(255, 181, 166, 0.64);
        transform: translateY(-1px);
        
    ` : `
        background: transparent;
        box-shadow: none;
        
    `}
    
    &:hover {
        ${props => !props.active && `
            background: rgba(255, 255, 255, 0.3);
        `}
    }
`;

const TabButtonItemText = styled.span.withConfig({
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
    font-size: 14px;
    font-weight: ${props => props.active ? '900' : '600'};
    font-family: 'nanum-square';
    color: #333;
    transition: all 0.3s ease;
`;

