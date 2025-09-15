export const handleMouseEnter = (
    options: { backgroundColor: string; color: string },
    e: React.MouseEvent<HTMLDivElement>
) => {
    e.currentTarget.style.backgroundColor = options.backgroundColor;
    e.currentTarget.style.color = options.color;
    e.currentTarget.style.cursor = "pointer";
};

export const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "";
    e.currentTarget.style.color = "";
};
