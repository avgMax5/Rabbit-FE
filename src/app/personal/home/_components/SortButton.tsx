import styled from "styled-components";
import { useState } from "react";
import { Filters, useBunnyStore } from "@/app/_store/bunnyStore";
import { BadgeData, BunnyFundingTypeData, BunnyTraitsData, PositionData } from "../_constants/constants";

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
            const newList = prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
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
        } else if (filterKey === "bunnyTraits"){
             displayText = BunnyTraitsData[selectedValue].alias;
        }
    }

    return (
        <Div onMouseOver={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)}>
            {isMulti && displayBadges.length > 0
                ? displayBadges.map((src, idx) => (
                    <img key={idx} src={src} alt="badge" style={{ width: "1.5rem", height: "1.5rem" }} />
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
  position: relative;
  width: 8.5rem;
  height: 2.8rem;
  line-height: 2.8;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: #94bcf1;
  box-shadow: -2px -2px 5px 0 #7c97cd inset, 2px 2px 5px 0 #bad0fb inset,
    1px 1px 4px 0 rgba(83, 91, 107, 0.64);
  font-family: var(--font-nanum-squar);
  font-weight: 900;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
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
  background: #94bcf1;
  box-shadow: -2px -4px 10px 0 #7c97cd inset, 6px 4px 10px 0 #bad0fb inset,
    4px 4px 10px 0 rgba(162, 179, 213, 0.64);
  font-size: 12px;
  color: #3f3f3f;
`;

const Select = styled.div<{ $isSelect: boolean }>`
  width: 100%;
  height: 1.6rem;
  text-align: center;
  line-height: 1.6rem;
  border-radius: 0.6rem;
  background: ${({ $isSelect }) => ($isSelect ? "#d8e8fe" : "none")};
  box-shadow: ${({ $isSelect }) =>
    $isSelect ? "2px 2px 4px 0 #9ba5b8 inset, -2px -2px 2px 0 #9ba5b8 inset" : "none"};
`;

export default SortButton;
