import styled from "styled-components";
import { useBunnyStore } from "@/app/_store/bunnyStore";
import { fieldList } from "../_constants/constants";

import List from "./List";
import { useEffect, useMemo, useState } from "react";
import { Loading } from "@/app/_shared/components";


export function getYesterdayMidnight(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0); // 오늘 0시
    d.setDate(d.getDate() - 1); // 어제로 이동
    return d;
}

export function ListContainer() {
    const dataList = useBunnyStore((state) => state.bunnies);

    const filteredList = useMemo(() => {
    const threshold = getYesterdayMidnight().getTime();

    return dataList.filter(
        (bunny) => new Date(bunny.created_at).getTime() >= threshold
    );
    }, [dataList]);

    return (
    <List
        fieldList={fieldList}
        dataList={filteredList}
        backgroundColor="rgba(255, 255, 255, 0.05)"
    />
    );
}

export function BunnyListContainer() {
    const { bunnies, isLoading, error, fetchBunnies } = useBunnyStore();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        fetchBunnies({ sortType: "", page, size });
    }, [page, size, fetchBunnies]);

    if (isLoading) return <Loading 
                            variant="bunny" 
                            size="small" 
                            text="버니들을 찾고 있어요..." 
                            fullScreen={false}
                        />;
    if (error) return <div>에러 발생: {error}</div>;

    return (
    <>
        <List
            fieldList={fieldList}
            dataList={bunnies}
            backgroundColor="rgba(255, 255, 255, 0.05)"
        />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <LoadMoreButton disabled={isLoading} onClick={() => setPage((page) => page + 1)}>
                {isLoading ? "로딩 중..." : "더보기"}
            </LoadMoreButton>
        </div>    
    </>
    );
}


const LoadMoreButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background: #94bcf1;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;