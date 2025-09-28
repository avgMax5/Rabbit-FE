import styled from 'styled-components';
import { motion } from 'framer-motion';

interface TabButtonProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabButton({ activeTab, setActiveTab }: TabButtonProps) {

  return (
    <TabButtonContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <TabButtonItem 
        active={activeTab === 'personal'} 
        onClick={() => setActiveTab('personal')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <TabButtonItemText active={activeTab === 'personal'}>
            개인 계정
        </TabButtonItemText>
      </TabButtonItem>
      <TabButtonItem 
        active={activeTab === 'corporate'} 
        onClick={() => setActiveTab('corporate')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <TabButtonItemText active={activeTab === 'corporate'}>
            기업 계정
        </TabButtonItemText>
      </TabButtonItem>
    </TabButtonContainer>
  );
}

const TabButtonContainer = styled(motion.div)`
    width: 320px;
    height: 56px;
    display: flex;
    flex-direction: row;
    margin-top: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 28px;
    padding: 6px;
    box-shadow: 
        0 8px 25px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
`;

const TabButtonItem = styled(motion.div).withConfig({
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
    flex: 1;
    width: 200px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 22px;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    font-family: 'nanum-square';
    
    ${props => props.active ? `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-weight: 700;
        box-shadow: 
            inset 3px 3px 6px rgba(255, 255, 255, 0.3),
            inset -3px -3px 6px rgba(0, 0, 0, 0.2),
            0 4px 15px rgba(102, 126, 234, 0.3);
        transform: translateY(-1px);
        
    ` : `
        background: rgba(255, 255, 255, 0.05);
        box-shadow: none;
        
    `}
    
    &:hover {
        ${props => !props.active && `
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        `}
    }
`;

const TabButtonItemText = styled.span.withConfig({
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
    font-size: 0.9rem;
    font-weight: ${props => props.active ? '700' : '600'};
    font-family: 'nanum-square';
    color: ${props => props.active ? '#ffffff' : '#374151'};
    transition: all 0.3s ease;
    text-shadow: ${props => props.active ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none'};
`;

