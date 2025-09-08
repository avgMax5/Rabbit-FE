import styled from "styled-components";

const Layout = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    flex-shrink: 0;
    padding: 0 1rem;
    border-radius: 8px;
    background: #a9c7ef;
    box-shadow: -2px -4px 10px 0 #597296 inset, 6px 4px 10px 0 #d8e8ff inset,
        3px 3px 8px 0 rgba(11, 61, 131, 0.64);
`;

export const LongTitle = styled(Layout)``;
export const ShortTitle = styled(Layout)`
    width: 100%;
    height: 60px;
    margin-bottom: 2rem;
`;
