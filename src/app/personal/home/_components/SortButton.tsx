import styled from "styled-components";
import { useState } from "react";

interface SortButtonProps {
    text: string;
    data: string[];
    isMulti?: boolean;
}

function SortButton(props: SortButtonProps) {
    const [display, setDisplay] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedList, setSelectedList] = useState<number[]>([]);
    const badgeImages = [
        "/images/personal/home/kakao_sort.png",
        "/images/personal/home/naver_sort.png",
        "/images/personal/home/shinhan_sort.png",
    ];

    const handleMouseOver = () => setDisplay(true);
    const handleMouseLeave = () => setDisplay(false);

    const handleSelect = (index: number) => {
        if (props.isMulti) {
            // 다중 선택
            setSelectedList((prev) =>
                prev.includes(index)
                    ? prev.filter((i) => i !== index)
                    : [...prev, index]
            );

            console.log(selectedList);
        } else {
            // 단일 선택
            setSelectedIndex(index === selectedIndex ? null : index);
        }
    };

    let displayText = props.text;
    let displayBadges: string[] = [];

    if (props.isMulti && selectedList.length > 0) {
        selectedList.map((i) => {
            displayBadges = selectedList.map((i) => badgeImages[i]);
        });
    } else if (!props.isMulti && selectedIndex !== null) {
        displayText = props.data[selectedIndex];
    }
    return (
        <Div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            {props.isMulti && displayBadges.length > 0
                ? displayBadges.map((src, idx) => (
                      <img
                          key={idx}
                          src={src}
                          alt="badge"
                          style={{
                              width: "1.5rem",
                              height: "1.5rem",
                          }}
                      />
                  ))
                : displayText}
            {display && (
                <SelectBox>
                    {props.data.map((value, i) => {
                        const isSelected = props.isMulti
                            ? selectedList.includes(i)
                            : selectedIndex === i;

                        return (
                            <Select
                                $isSelect={isSelected}
                                onClick={() => handleSelect(i)}
                                key={i}
                            >
                                {value}
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
    box-shadow: -2px -4px 10px 0 #7c97cd inset, 6px 4px 10px 0 #bad0fb inset,
        4px 4px 10px 0 rgba(162, 179, 213, 0.64);

    font-family: var(--font-nanum-squar);
    font-weight: 900;
    font-size: 16px;
    color: #fff;
`;

const SelectBox = styled.div`
    z-index: 999;
    position: absolute;
    top: 2rem;
    right: -3rem;
    display: flex;
    width: 8rem;
    height: auto;
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
        $isSelect
            ? "2px 2px 4px 0 #9ba5b8 inset, -2px -2px 2px 0 #9ba5b8 inset"
            : "none"};
`;

export default SortButton;
