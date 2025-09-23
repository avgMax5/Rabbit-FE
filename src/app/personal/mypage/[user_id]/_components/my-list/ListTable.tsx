import styled from "styled-components";

interface ListProps<T> {
    fieldList: { key: string; label: string }[];
    dataList: T[];
    title: string;
    width?: string;
    height?: string;
}

interface ValueProps {
    color: string;
}

const sliceString = (text: string) => {
    const str = text;
    const result = str.slice(0, 19).replace("T", " ");
    return result;
};

const formatValue = (key: string, value: any) => {
    if (["matched_at", "ordered_at"].includes(key)) {
        return sliceString(String(value));
    }
    if (typeof value === "number") {
        return value.toLocaleString();
    }
    return value != null ? String(value) : "";
};

const OrderTypeStyle = (key: string, value: any) => {
    if (key === "order_type" && String(value) === "BUY") {
        return {
            color: "#df0606",
        };
    } else if (key === "order_type" && String(value) === "SELL") {
        return {
            color: "#040faf",
        };
    }
    return {
        color: "#000000",
    };
};

function ListTable<T>({ fieldList, dataList, title }: ListProps<T>) {
    return (
        <Div>
            <FieldContainer $fieldNum={fieldList.length}>
                {fieldList.map((field) => (
                    <span key={field.key}>{field.label}</span>
                ))}
            </FieldContainer>
            <RowContainer>
                {dataList.length == 0 ? (
                    <RowLengthZero>{title} 해라 버니! 버니!</RowLengthZero>
                ) : (
                    dataList.map((data, i) => {
                        console.log(data, i, "data");

                        const RowComponent = i % 2 === 0 ? Erow : Orow;
                        return (
                            <RowComponent key={i} $fieldNum={fieldList.length}>
                                {fieldList.map((field) => {
                                    const key = field.key as keyof T;
                                    const value = data[key];

                                    return (
                                        <Value
                                            key={field.key}
                                            $styleObj={OrderTypeStyle(
                                                field.key,
                                                value
                                            )}
                                        >
                                            {formatValue(field.key, value)}
                                        </Value>
                                    );
                                })}
                            </RowComponent>
                        );
                    })
                )}
            </RowContainer>
        </Div>
    );
}

const Row = styled.div<{ $fieldNum: number }>`
    width: 100%;
    height: 2.2rem;
    display: grid;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
    gap: 0.2rem;
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    padding: 0.3rem 0.2rem;
    border-radius: 3px;

    font-size: 10px;
    font-weight: 800;
    /* & div {
        border-right: 0.1px solid rgba(29, 31, 35, 0.2);

        &:last-child {
            border-right: none;
        }
    } */
`;

const Value = styled.div<{ $styleObj: ValueProps }>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.$styleObj.color};
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
    gap: 0.4rem;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    padding: 0.4rem;
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
    height: 100%;
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

const RowLengthZero = styled.div`
    background-color: #6e6c6c46;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fccd4e;
`;

const Erow = styled(Row)`
    background: #fff;
    box-shadow: 1px 1px 10px 0 rgba(204, 204, 204, 0.25) inset,
        0 2px 2px 0 rgba(0, 0, 0, 0.25);
`;

const Orow = styled(Row)`
    background: #ffffff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
`;

export default ListTable;
