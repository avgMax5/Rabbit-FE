import styled from "styled-components";

function Banner() {
    return (
        <BannerContainer>
            <BannerMain>
                <BannerContent>
                    <Slogan>
                        <div>JUMP</div>
                        <div style={{ color: "#338ADA" }}>WITH</div>
                        <span
                            style={{
                                color: "rgba(51, 138, 218, 0.73)",
                            }}
                        >
                            YOUR
                        </span>
                        <span>BUNNY</span>
                    </Slogan>
                    <Rocket src={"./images/personal/main/main_rocket.png"} />
                </BannerContent>
            </BannerMain>
            <BannerPaginations>
                <SelectDots />
                <Dots />
                <Dots />
            </BannerPaginations>
        </BannerContainer>
    );
}

const BannerContainer = styled.div`
    width: 100%;
    height: 28rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 4rem;
`;
const Rocket = styled.img`
    position: absolute;
    top: -6rem;
    right: 8rem;
    z-index: 999;
    width: 33rem;
    height: auto;
`;

const Slogan = styled.div`
    position: absolute;
    top: -3rem;
    left: 4rem;
    width: 39rem;

    color: rgba(255, 255, 255, 0.81);
    text-shadow: 4.315px 4.315px 8px #738398;

    font-family: Rockstar;
    font-size: 115.055px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    text-transform: capitalize;
`;
const BannerMain = styled.div`
    position: relative;
    width: 96%;
    height: 100%;
`;
const BannerContent = styled.div`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    border-radius: 16px;
    background: linear-gradient(
        268deg,
        rgba(66, 0, 189, 0.64) -2.14%,
        rgba(0, 86, 205, 0.72) 37.22%,
        rgba(184, 214, 255, 0.72) 76.57%,
        rgba(224, 237, 255, 0.72) 99.55%
    );
    box-shadow: -3px 0 10px 0 rgba(26, 51, 123, 0.44) inset,
        3px 3px 10px 0 #9dbaff inset;
    filter: drop-shadow(-8px 8px 20px rgba(0, 0, 0, 0.27));
`;
const BannerPaginations = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 4.3rem;
    height: 1.5rem;
    margin-top: 1rem;
    aspect-ratio: 68/21;
    border-radius: 0.7rem;
    background: rgba(234, 235, 231, 0.69);
    box-shadow: -1.2px -2.5px 6.4px 0 #d8d8d8 inset,
        3.88px 2.587px 6.467px 0 #fefffc inset,
        2.587px 2.587px 6.467px 0 rgba(201, 192, 180, 0.64);
`;

const Dots = styled.div`
    width: 0.7rem;
    height: 0.7rem;
    flex-shrink: 0;
    border-radius: 0.7rem;
    background: #b6b6b6;
    box-shadow: -1.293px -1.293px 2.587px 0 #8d8d8d inset,
        1.293px 1.293px 2.587px 0 #dfdfdf inset,
        1.293px 1.293px 1.293px 0 rgba(182, 182, 182, 0.33);
`;

const SelectDots = styled(Dots)`
    background: #ff8969;
    box-shadow: -1.293px -1.293px 2.587px 0 #f85e36 inset,
        1.293px 1.293px 2.587px 0 #ffd2c7 inset,
        1.293px 1.293px 1.293px 0 rgba(255, 137, 105, 0.33);
`;

export default Banner;
