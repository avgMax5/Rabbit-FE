export const handleEnterBackground = (
    options: { backgroundColor: string; color: string },
    e: React.MouseEvent<HTMLDivElement>
) => {
    e.currentTarget.style.backgroundColor = options.backgroundColor;
    e.currentTarget.style.color = options.color;
    e.currentTarget.style.cursor = "pointer";
};

export const handleLeaveBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "";
    e.currentTarget.style.color = "";
};

export const handleBtnEnterBackground = (
    options: { backgroundColor: string; color: string },
    e: React.MouseEvent<HTMLButtonElement>
) => {
    e.currentTarget.style.backgroundColor = options.backgroundColor;
    e.currentTarget.style.color = options.color;
    e.currentTarget.style.cursor = "pointer";
};

export const handleBtnLeaveBackground = (
    e: React.MouseEvent<HTMLButtonElement>
) => {
    e.currentTarget.style.backgroundColor = "";
    e.currentTarget.style.color = "";
};
