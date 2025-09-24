import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import styled from "styled-components";

export interface linkDatatype {
    sns_id: string;
    url: string;
    type: string;
    favicon: string;
}

interface LinkProps {
    linkData: linkDatatype[];
    name: string;
}

const findSvg = (url: string) => {
    if (!url) return "/images/favicon/etc.svg";

    try {
        const hostname = new URL(url).hostname.toLowerCase();

        if (hostname.includes("github")) return "/images/favicon/github.svg";
        if (hostname.includes("instagram"))
            return "/images/favicon/instagram.svg";
        if (hostname.includes("naver")) return "/images/favicon/naver.svg";
        if (hostname.includes("tistory")) return "/images/favicon/tistory.svg";
        if (hostname.includes("velog")) return "/images/favicon/velog.svg";
        if (hostname.includes("youtube")) return "/images/favicon/youtube.svg";

        return "/images/favicon/etc.svg";
    } catch {
        return "/images/favicon/etc.svg";
    }
};

const getValidationRules = () => {
    const rules: Record<string, any> = {
        required: "링크를 입력해주세요",
    };

    return rules;
};

function Link({ linkData, name }: LinkProps) {
    const { control, register, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });
    const mounted = useRef(false);
    const emptyLink: linkDatatype = {
        sns_id: "",
        url: "",
        type: "",
        favicon: "",
    };

    useEffect(() => {
        if (!mounted.current && linkData.length > 0) {
            append(linkData);
            mounted.current = true;
        }
    }, [append, linkData]);

    useEffect(() => {
        console.log("link", fields);
    }, [fields]);

    return (
        <Wrapper>
            <Title>
                <LeftDiv>
                    <Icon
                        icon="rivet-icons:link"
                        color="#149FAE"
                        width={"1.4rem"}
                    />
                    링크
                </LeftDiv>
                <AddRowBtn
                    onClick={() => {
                        append(emptyLink);
                    }}
                />
            </Title>
            <Form>
                {fields.map((link, i) => {
                    const typedLink = link as unknown as linkDatatype;
                    const url = watch(`${name}[${i}].url`);
                    const faviconSrc = findSvg(url);

                    return (
                        <Row key={i}>
                            <Favicon $src={faviconSrc} />
                            <LinkInput
                                {...(register(`${name}[${i}].url`),
                                getValidationRules())}
                                defaultValue={typedLink.url}
                            />
                            <DeleteBtn
                                onClick={() => {
                                    remove(i);
                                }}
                            >
                                <Icon
                                    icon="iconamoon:trash-bold"
                                    color="#ffffff"
                                />
                            </DeleteBtn>
                        </Row>
                    );
                })}
            </Form>
        </Wrapper>
    );
}

const Wrapper = styled.div``;

const Title = styled.div`
    display: flex;
    gap: 0.5rem;
    height: 2.2rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.6rem;

    color: #fbc95e;
    font-size: 17px;
    font-weight: 800;
`;

const LeftDiv = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const AddRowBtn = styled.div`
    background-image: url("/images/personal/mypage/plus_btn.png");
    background-repeat: no-repeat;
    background-size: contain;
    width: 1.4rem;
    height: 1.4rem;
    cursor: pointer;
`;

const Form = styled.div`
    width: 100%;
    height: 7rem;
    border-radius: 6px;
    display: flex;
    gap: 0.6rem;
    padding: 0.5rem 0rem;
    flex-direction: column;
    overflow-y: auto;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    height: 1.7rem;
    border-radius: 6px;
    padding: 0 0.2rem;
`;

const Favicon = styled.div<{ $src: string }>`
    background-image: url(${(props) => props.$src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 1.4rem;
    height: 1.4rem;

    object-fit: cover;
`;

const LinkInput = styled.input`
    width: 90%;
    height: 1.5rem;
    padding: 0 0.3rem;
    border: none;
    border-radius: 6px;
    text-overflow: ellipsis;

    background-color: #e7e7e765;
    color: #041c84;

    &:focus {
        border: 1px solid #0558f4;
        background: #ffffff !important;
    }
`;

const DeleteBtn = styled.button`
    width: 1rem;
    background: none;
    height: 1.8rem;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 15px;
`;

export default Link;
