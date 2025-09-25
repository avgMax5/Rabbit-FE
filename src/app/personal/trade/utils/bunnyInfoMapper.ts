import { Bunny } from "../../../_store/bunnyStore";

export const bunnyTypeValidate = (bunny: Bunny) => {
    if (bunny.bunny_type === "A") {
        return "희소 자산형";
    } else if(bunny.bunny_type === "B") {
        return "밸런스형";
    } else if(bunny.bunny_type === "C") {
        return "단가 친화형";
    } 
    return "";
};

export const positionValidate = (position: string) => {
    if (position === "FRONTEND") {
        return "프론트엔드";
    } else if(position === "BACKEND") {
        return "백엔드";
    } else if(position === "FULLSTACK") {
        return "풀스택";
    }
    return "";
};

export const developerTypeValidate = (developer_type: string) => {

    if (developer_type === "GROWTH") {
        return "성장형";
    } else if(developer_type === "STABILITY") {
        return "안정형";
    } else if(developer_type === "VALUE") {
        return "가치형";
    } else if(developer_type === "POPULARITY") {
        return "인기형";
    } else if(developer_type === "BALANCE") {
        return "기본형";
    }
    return "기본형";
}

export const getPositionIcon = (position: string) => {
    if (position === "FRONTEND") {
        return "/images/icon/frontend.png";
    } else if(position === "BACKEND") {
        return "/images/icon/backend.png";
    } else if(position === "FULLSTACK") {
        return "/images/icon/fullstack.png";
    }
    return "/images/icon/frontend.png";
};

export const getDeveloperTypeIcon = (developer_type: string) => {
    if (developer_type === "GROWTH") {
        return "/images/icon/dev_grow.png";
    } else if(developer_type === "STABILITY") {
        return "/images/icon/dev_safe.png";
    } else if(developer_type === "VALUE") {
        return "/images/icon/dev_popular.png";
    } else if(developer_type === "POPULARITY") {
        return "/images/icon/dev_value.png";
    } else if(developer_type === "BALANCE") {
        return "/images/icon/dev_basic.png";
    }
    return "/images/icon/dev_basic.png";
};

export const getBunnyTypeIcon = (bunny: Bunny) => {
    if (bunny.bunny_type === "A") {
        return "/images/trade/unique.png";
    } else if(bunny.bunny_type === "B") {
        return "/images/trade/growth.png";
    } else if(bunny.bunny_type === "C") {
        return "/images/trade/rocket.png";
    }
    return "/images/trade/unique.png";
};

export const getBadgeIcon = (badge: string[]) => {
    if (badge.includes("KAKAO")) {
        return "/images/personal/home/kakao_sort.png";
    } else if (badge.includes("NAVER")) {
        return "/images/personal/home/naver_sort.png";
    } else if (badge.includes("SHINHAN")) {
        return "/images/personal/home/shinhan_sort.png";
    }
    return "";
};

export const getLinkIcon = (link: string) => {
    if (link.includes("github")) {
        return "/images/favicon/github.svg";
    } else if (link.includes("instagram")) {
        return "/images/favicon/instagram.svg";
    } else if (link.includes("naver")) {
        return "/images/favicon/naver.svg";
    } else if (link.includes("youtube")) {
        return "/images/favicon/youtube.svg";
    } else if (link.includes("velog")) {
        return "/images/favicon/velog.svg";
    } else if(link.includes("tistory")) {
        return "/images/favicon/tistory.svg";
    }
    return "/images/favicon/etc.svg";
}