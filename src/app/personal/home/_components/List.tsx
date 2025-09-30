"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import {
    BadgeData,
    PositionData,
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
                        로켓에 탑승하고 있는 버니가 없어요
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
                                            {/* {field.key === "badges" && } */}
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
        if (value.length === 0) return <NoBadge>미보유</NoBadge>;

        const visibleBadges = value.slice(0, 4);
        const extraCount = value.length - 4;

        return (
            <>
                {visibleBadges.map((name: string) => {
                    const badge = BadgeData.find((b) => b.name === name);
                    return badge ? (
                        <SmallBadge
                            key={badge.id}
                            src={badge.src}
                            alt={badge.name}
                        />
                    ) : (
                        <span key={name}>{name}</span>
                    );
                })}
                {extraCount > 0 && (
                    <span style={{ marginLeft: "2px", fontSize: "10px" }}>
                        +{extraCount}
                    </span>
                )}
            </>
        );
    }

    if (fieldKey === "fluctuation_rate" && typeof value === "number") {
        const color = value > 0 ? "#ff5a5a" : value < 0 ? "#60a5fa" : "#fff";
        return <span style={{ color, fontWeight: "800" }}>{value.toFixed(2)}%</span>;
    }

    if (fieldKey === "current_price") {
        const rate = rowData["fluctuation_rate"];
        const color = rate > 0 ? "#ff5a5a" : rate < 0 ? "#60a5fa" : "#fff";
        return (
            <span style={{ color, fontWeight: "800" }}>
                {Number(value).toLocaleString()}
            </span>
        );
    }

    if (fieldKey === "user_name") {
        return (
            <span style={{ fontWeight: "600", color: "#fff" }}>
                {value ?? "-"}
            </span>
        );
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
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 800px;
    gap: 0.4rem;
    padding: 0.5rem;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        width: 6px;
        display: none;
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
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(176, 106, 179, 0.12) 30%,
        rgba(28, 181, 224, 0.08) 70%,
        rgba(0, 0, 70, 0.15) 100%
    );
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    color: rgba(255, 255, 255, 0.9);

    &:hover {
        transform: scale(1.02);
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(176, 106, 179, 0.18) 30%,
            rgba(28, 181, 224, 0.12) 70%,
            rgba(0, 0, 70, 0.425) 100%
        );
        box-shadow: 0 4px 10px rgba(176, 106, 179, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
`;

const Orow = styled(Row)`
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.06) 0%,
        rgba(28, 181, 224, 0.1) 30%,
        rgba(176, 106, 179, 0.08) 70%,
        rgba(0, 0, 70, 0.12) 100%
    );
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    color: rgba(255, 255, 255, 0.85);

    &:hover {
        transform: scale(1.02);
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(28, 181, 224, 0.15) 30%,
            rgba(176, 106, 179, 0.12) 70%,
            rgba(0, 0, 70, 0.18) 100%
        );
        box-shadow: 0 8px 32px rgba(28, 181, 224, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
`;

const SmallBadge = styled.img`
    width: 14px;
    height: 14px;
    object-fit: cover;
`;

const EmptyRowMessage = styled.div`
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    color: #94a3b8;
    font-size: 14px;
    font-style: italic;
`;

const NoBadge = styled.span`
    width: 3.5rem;
    height: 1.3rem;
    border-radius: 1rem;
    text-align: center;
    line-height: 1.3rem;
    font-size: 8px;
    background-color: #d5ebff51;
`;

export default List;
