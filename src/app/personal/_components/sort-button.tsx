import styled from "styled-components";

function SortButton(props: { text: string }) {
    return <Div>{props.text}</Div>;
}

const Div = styled.div`
    width: 8rem;
    height: 3rem;
    text-align: center;
    line-height: 3rem;

    border-radius: 25px;
    background: #cdddfd;
    box-shadow: -2px -4px 10px 0 #6a7ca0 inset, 6px 4px 10px 0 #dbe5f8 inset,
        4px 4px 10px 0 rgba(162, 179, 213, 0.64);
`;

export default SortButton;
