import styled from "styled-components";

interface ListProps<T> {
    fieldList: { key: string; label: string }[];
    dataList: T[];
    width?: string;
    height?: string;
}

function ListTable<T>({ fieldList, dataList }: ListProps<T>) {
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
    border-radius: 3px;

    font-weight: 600;
    font-size: 0.6rem;

    & span {
        border-right: 1px solid rgba(148, 163, 184, 0.2);

        &:last-child {
            border-right: none;
        }
    }
`;

const Div = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 2.5rem 34vh;
    gap: 0.5rem;
    background: rgba(15, 23, 42);
    border-radius: 16px;
    font-family: var(--font-nanum-square);
`;

const FieldContainer = styled.div<{ $fieldNum: number }>`
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    padding: 0.7rem 0rem;
    background: linear-gradient(
        135deg,
        rgba(59, 130, 246, 0.1) 0%,
        rgba(99, 102, 241, 0.08) 100%
    );
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);

    font-weight: 700;
    font-size: 13px;
    color: rgba(226, 232, 240);

    & span {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(148, 163, 184, 0.2);

        &:last-child {
            border-right: none;
        }
    }
`;

const RowContainer = styled.div`
    width: 100%;
    max-height: 100%;
    height: 100%; // Div의 첫 행 + gap 빼기
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 0.4rem;
    padding: 0.4rem;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(15, 23, 42, 0.3);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: linear-gradient(
            180deg,
            rgba(108, 158, 238, 0.6) 0%,
            rgba(40, 43, 202, 0.6) 100%
        );
        border-radius: 3px;
    }
`;

const Erow = styled(Row)`
    background: #fff;
    box-shadow: 1px 1px 10px 0 rgba(204, 204, 204, 0.25) inset,
        0 2px 2px 0 rgba(0, 0, 0, 0.25);
`;

const Orow = styled(Row)`
    background: #e1e1e1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
`;

export default ListTable;
