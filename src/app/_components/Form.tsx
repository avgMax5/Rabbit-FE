import styled from 'styled-components';
import localFont from "next/font/local";
import { useState } from 'react';
import { motion } from 'framer-motion';
import TabButton from './TabButton';
import FormPersonal from './FormPersonal';
import FormCorporation from './FormCorporation';

export default function Form({ initial, animate, transition }: any) {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <FormContainer
      as={motion.div}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <TabButton activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'personal' ? <FormPersonal /> : <FormCorporation />}
    </FormContainer>
  );
}

const FormContainer = styled.div`
    width: 590px;
    height: 595px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 254, 254, 0.56);
    border-radius: 20px;
`;