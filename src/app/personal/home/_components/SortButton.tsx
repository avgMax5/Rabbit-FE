import styled from "styled-components";
import { useState } from "react";
import { Filters, useBunnyStore } from "@/app/_store/bunnyStore";
import {
    BadgeData,
    BunnyFundingTypeData,
    BunnyTraitsData,
    PositionData,
} from "../_constants/constants";

interface SortButtonProps {
    text: string;
    data: string[];
    isMulti?: boolean;
    filterKey: keyof Filters;
}

function SortButton({ text, data, isMulti, filterKey }: SortButtonProps) {
    const { filters, setFilter } = useBunnyStore();
    const [display, setDisplay] = useState(false);

    const selectedValue = filters[filterKey];
    const badgeImages = [
        "/images/personal/home/kakao_sort.png",
        "/images/personal/home/naver_sort.png",
        "/images/personal/home/shinhan_sort.png",
    ];

    const handleSelect = (index: number) => {
        if (isMulti) {
            const prev = Array.isArray(selectedValue) ? selectedValue : [];
            const newList = prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index];
            setFilter(filterKey, newList);
        } else {
            const newIndex = selectedValue === index ? null : index;
            setFilter(filterKey, newIndex);
        }
    };

    // 표시 텍스트 / 뱃지 계산
    let displayText = text;
    let displayBadges: string[] = [];

    if (isMulti && Array.isArray(selectedValue) && selectedValue.length > 0) {
        displayBadges = selectedValue.map((i) => badgeImages[i]);
    } else if (!isMulti && typeof selectedValue === "number") {
        // 기본값
        displayText = data[selectedValue];

        // alias 매핑
        if (filterKey === "badges") {
            displayText = BadgeData[selectedValue].alias;
        } else if (filterKey === "position") {
            displayText = PositionData[selectedValue].alias;
        } else if (filterKey === "bunnyType") {
            displayText = BunnyFundingTypeData[selectedValue].alias;
        } else if (filterKey === "bunnyTraits") {
            displayText = BunnyTraitsData[selectedValue].alias;
        }
    }

    return (
        <Div
            onMouseOver={() => setDisplay(true)}
            onMouseLeave={() => setDisplay(false)}
        >
            {isMulti && displayBadges.length > 0
                ? displayBadges.map((src, idx) => (
                      <img
                          key={idx}
                          src={src}
                          alt="badge"
                          style={{ width: "1.2rem", height: "1.2rem" }}
                      />
                  ))
                : displayText}
            {display && (
                <SelectBox>
                    {data.map((value, i) => {
                        const isSelected = isMulti
                            ? (selectedValue as number[])?.includes(i)
                            : selectedValue === i;

                        let label = value;

                        if (filterKey === "badges") {
                            label = BadgeData[i].alias;
                        } else if (filterKey === "position") {
                            label = PositionData[i].alias;
                        } else if (filterKey === "bunnyType") {
                            label = BunnyFundingTypeData[i].alias;
                        } else if (filterKey === "bunnyTraits") {
                            label = BunnyTraitsData[i].alias;
                        }

                        return (
                            <Select
                                $isSelect={isSelected}
                                onClick={() => handleSelect(i)}
                                key={i}
                            >
                                {label}
                            </Select>
                        );
                    })}
                </SelectBox>
            )}
        </Div>
    );
}

const Div = styled.div`
    height: 2.1rem;
    font-weight: bold;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-align: center;
    color: #ffffff;
    display: flex;
    gap: 6px;
    padding: 8px 30px 8px 30px;
    position: relative;
    background-color: #ffffff39;
    border: 1px solid #ffffffaa;
    border-radius: 25px;
    box-shadow: 4px 4px 4px 0 rgba(116, 79, 168, 0.242);
    transition: all 0.4s ease-in-out;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const SelectBox = styled.div`
    z-index: 999;
    position: absolute;
    top: 2rem;
    right: -3rem;
    display: flex;
    width: 8rem;
    padding: 0.8rem 0.6rem;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    border-radius: 0.6rem;
    background: linear-gradient(to right, #c2cffae3, #e2e2e2df);
    box-shadow: -2px -2px 4px 0 #eeeeeeea inset, 1px 1px 4px 0 #ffffffea inset;
`;

const Select = styled.div<{ $isSelect: boolean }>`
    width: 100%;
    height: 1.6rem;
    text-align: center;
    line-height: 1.6rem;
    border-radius: 0.3rem;
    background: ${({ $isSelect }) =>
        $isSelect ? "linear-gradient(to right, #a4b7f7d9, #f2fcfe)" : "none"};
    box-shadow: ${({ $isSelect }) =>
        $isSelect
            ? "2px 2px 4px 0 #ffffff0 inset, -2px -2px 2px 0 #616161ea inset"
            : "none"};
    color: ${({ $isSelect }) => ($isSelect ? "#000" : "#000000")};
    font-weight: ${({ $isSelect }) => ($isSelect ? "800" : "600")};

    transition: all 0.3s ease-in-out;
    transform: ${({ $isSelect }) => ($isSelect ? "scale(1.05)" : "scale(1)")};
`;

export default SortButton;
