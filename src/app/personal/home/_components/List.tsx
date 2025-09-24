"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { BadgeData } from "../_constants/constants";

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
                {dataList.map((data, i) => {
                    const RowComponent = i % 2 === 0 ? Erow : Orow;
                    return (
                    <RowComponent 
                        key={i} 
                        $fieldNum={fieldList.length}
                        onClick={() =>
                            router.push(
                                `/personal/trade/${(data as Record<string, any>).bunny_name}`
                            )
                        }>
                        {fieldList.map((field) => {
                        const value = (data as Record<string, any>)[field.key];
                        return (
                            <span key={field.key}>
                            {Array.isArray(value) ? (
                                value.length > 0 ? (
                                value.map((name: string) => {
                                    const badge = BadgeData.find((b) => b.name === name);
                                    return badge ? (
                                         <SmallBadge key={badge.id} src={badge.src} alt={badge.name} />
                                    ) : (
                                        <span key={name}>{name}</span>
                                    );
                                })
                                ) : (
                                "-"
                                )
                            ) : (
                                value
                            )}
                            </span>

                        );
                        })}
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

    font-family: var(--font-nanum-squar);
    font-weight: 600;
    font-size: 12px;

    & span {
        border-right: 1px solid rgba(148, 163, 184, 0.2);

        &:last-child {
            border-right: none;
        }
    }
`;

const Div = styled.div<{ $backgroundColor: string }>`
    display: grid;
    // grid-template-rows: 2.2rem 60%;
    gap: 0.5rem;
    width: 100%;
    // height: 25rem;
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
    grid-template-columns: repeat(${(props) => props.$fieldNum}, 1.2fr);
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
        }
    }
`;

const RowContainer = styled.div`
    width: 100%;
    height: 100%; // Div의 첫 행 + gap 빼기
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 0.4rem;
    padding: 0.5rem;

    /* Custom scrollbar */
    /* 스크롤바 안보이게 */
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
  width: 20px;   /* row에서 잘 보일 크기 */
  height: 20px;
  border-radius: 4px;  /* 살짝 둥글게 */
  object-fit: cover;   /* 이미지가 찌그러지지 않도록 */
`;


export default List;
