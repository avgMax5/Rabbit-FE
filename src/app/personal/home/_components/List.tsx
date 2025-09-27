"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import {
    BadgeData,
    PositionData,
    BunnyFundingTypeData,
    BunnyTraitsData,
} from "../_constants/constants";

interface ListProps<T> {
    fieldList: { key: string; label: string }[];
    dataList: T[];
    width?: string;
    height?: string;
    backgroundColor: string;
}

function List<T>({ fieldList, dataList, backgroundColor }: ListProps<T>) {
    const router = useRouter();
    return (
        <Div $backgroundColor={backgroundColor}>
            <FieldContainer $fieldNum={fieldList.length}>
                {fieldList.map((field) => (
                    <span key={field.key}>{field.label}</span>
                ))}
            </FieldContainer>
            <RowContainer>
                {!dataList || dataList.length === 0 ? (
                    <EmptyRowMessage>
                        로켓에 탑승한 버니가 없어요
                    </EmptyRowMessage>
                ) : (
                    dataList.map((data, i) => {
                        const RowComponent = i % 2 === 0 ? Erow : Orow;
                        return (
                            <RowComponent
                                key={i}
                                $fieldNum={fieldList.length}
                                onClick={() =>
                                    router.push(
                                        `/personal/trade/${
                                            (data as Record<string, any>)
                                                .bunny_name
                                        }`
                                    )
                                }
                            >
                                {fieldList.map((field) => {
                                    const value = (data as Record<string, any>)[
                                        field.key
                                    ];
                                    return (
                                        <div key={field.key}>
                                            {renderValue(
                                                field.key,
                                                value,
                                                data as Record<string, any>
                                            )}
                                        </div>
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

function renderValue(
    fieldKey: string,
    value: any,
    rowData: Record<string, any>
) {
    if (Array.isArray(value)) {
        if (value.length === 0) return "-";

        return value.map((name: string) => {
            const badge = BadgeData.find((b) => b.name === name);
            return badge ? (
                <SmallBadge key={badge.id} src={badge.src} alt={badge.name} />
            ) : (
                <span key={name}>{name}</span>
            );
        });
    }

    if (fieldKey === "fluctuation_rate" && typeof value === "number") {
        const color = value > 0 ? "red" : value < 0 ? "blue" : "black";
        return <span style={{ color }}>{value}%</span>;
    }

    if (fieldKey === "current_price") {
        const rate = rowData["fluctuation_rate"];
        const color = rate > 0 ? "red" : rate < 0 ? "blue" : "black";
        return <span style={{ color }}>{Number(value).toLocaleString()}</span>;
    }

    const position = PositionData.find((b) => b.name === value);
    if (position) {
        return <span key={position.id}>{position.alias}</span>;
    }

    const devType = BunnyTraitsData.find((b) => b.name === value);
    if (devType) {
        return <span key={devType.id}>{devType.alias}</span>;
    }

    return <span>{value ?? "-"}</span>;
}

const Row = styled.div<{ $fieldNum: number }>`
    width: 100%;
    height: 2.2rem;
    display: grid;
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1fr);
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    border-radius: 3px;

    font-family: var(--font-nanum-squar);
    font-weight: 600;
    font-size: 12px;

    & div {
        display: flex;
        justify-content: center;
        border-right: 1px solid rgba(148, 163, 184, 0.2);
        align-items: center;
        gap: 3px;

        &:last-child {
            border-right: none;
        }
    }
`;

const Div = styled.div<{ $backgroundColor: string }>`
    display: grid;
    gap: 0.5rem;
    width: 100%;
    align-items: center;
    flex-shrink: 0;
    border-radius: 12px;
    background: ${(props) => props.$backgroundColor};
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    cursor: default;
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
    background: linear-gradient(
        135deg,
        rgba(59, 130, 246, 0.1) 0%,
        rgba(99, 102, 241, 0.08) 100%
    );
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    position: relative;

    font-family: var(--font-nanum-squar);
    font-weight: 700;
    font-size: 13px;
    color: rgba(226, 232, 240);

    & span {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(148, 163, 184, 0.2);

        &:last-child {
            border-right: none;
            padding-right: 0.8rem;
        }
    }
`;

const RowContainer = styled.div`
    width: 100%;
    height: 100%; // Div의 첫 행 + gap 빼기
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 800px;
    gap: 0.4rem;
    padding: 0.5rem;

    /* Custom scrollbar */
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        width: 6px;
        display: none; /* Chrome, Safari */
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
    cursor: pointer;

    &:hover {
        background: #e0f2fe;
    }
`;

const Orow = styled(Row)`
    background: #f1f1f1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
    cursor: pointer;

    &:hover {
        background: #dbeafe;
    }
`;

const SmallBadge = styled.img`
    width: 20px;
    height: 20px;
    object-fit: cover;
`;

const EmptyRowMessage = styled.div`
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    color: #94a3b8; /* 연한 회색 */
    font-size: 14px;
    font-style: italic;
`;

export default List;
