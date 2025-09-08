import styled from 'styled-components';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LogoSlogan({ initial, animate, transition }: any) {
    return (
        <LogoSloganContainer
            as={motion.div}
            initial={initial}
            animate={animate}
            transition={transition}
        >
            <LogoImage
                src="/images/logo.png"
                alt="Rabbit Logo"
                width={436}
                height={130}
                priority
            />
            <SloganText>
                개발자들의 <HighlightText>가치</HighlightText><br />
                <GoldText>Rabbit과</GoldText> <HighlightText>같이</HighlightText>
            </SloganText>
        </LogoSloganContainer>
    );
}

const LogoSloganContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

const LogoImage = styled(Image)`
    object-fit: contain;
    
    width: 234px;
    height: 70px;
`;

const SloganText = styled.h1`
    font-size: 70px;
    font-weight: 500;
    color: white;
    text-align: right;
    line-height: 1.6;
    margin: 0;
    white-space: nowrap;
`;

const HighlightText = styled.span`
    font-weight: 900;
`;

const GoldText = styled.span`
    font-weight: 700;
    color: #FEDC95;
`;