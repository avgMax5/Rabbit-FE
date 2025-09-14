import styled from "styled-components";

interface ListProps<T> {
    fieldList: { key: string; label: string }[];
    dataList: T[];
    width?: string;
    height?: string;
}

function List<T>({ fieldList, dataList }: ListProps<T>) {
    return (
        <Div>
            <FieldContainer $fieldNum={fieldList.length}>
                {fieldList.map((field) => (
                    <span key={field.key}>{field.label}</span>
                ))}
            </FieldContainer>
            <RowContainer>
                {dataList.map((data, i) => {
                    const RowComponent = i % 2 === 0 ? Erow : Orow;
                    return (
                        <RowComponent key={i} $fieldNum={fieldList.length}>
                            {fieldList.map((field) => (
                                <span key={field.key}>
                                    {(data as Record<string, any>)[field.key]}
                                </span>
                            ))}
                        </RowComponent>
                    );
                })}
            </RowContainer>
        </Div>
    );
}

const Row = styled.div<{ $fieldNum: number }>`
    width: 100%;
    height: 2.2rem;
    display: grid;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    padding: 0.7rem 0rem;

    font-family: var(--font-nanum-squar);
    font-weight: 800;
    font-size: 12px;
`;

const Div = styled.div`
    display: grid;
    grid-template-rows: 2.2rem 60%;
    gap: 0.5rem;
    width: 100%;
    height: 22rem;
    align-items: center;
    flex-shrink: 0;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.18);
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const FieldContainer = styled.div<{ $fieldNum: number }>`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    padding: 0.7rem 0rem;

    font-family: var(--font-nanum-squar);
    font-weight: 900;
    font-size: 14px;
    color: #ddd;

    & span {
        flex: 1;
        text-align: center;
    }
`;

const RowContainer = styled.div`
    width: 100%;
    height: 100%; // Div의 첫 행 + gap 빼기
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 0.6rem;
`;

const Erow = styled(Row)`
    background: #fff;
    box-shadow: 1px 1px 10px 0 rgba(204, 204, 204, 0.25) inset,
        0 2px 2px 0 rgba(0, 0, 0, 0.25);
`;

const Orow = styled(Row)`
    background: #f1f1f1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
`;

export default List;
