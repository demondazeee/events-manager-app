import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";
import styles from './link.module.css'
import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";



export const PrimaryButton = styled.button`
    display: block;
    font-size: 2rem;
    font-weight: 500;
    border: none;
    background-color: #E11845;
    color: #fff;
    padding: 1rem 2rem;
    width: 100%;
    border-radius: 3px;
    border: 2.7px solid #000;
    border-radius: 3px;
    transition: box-shadow .2s ease-out,
    transform  .2s ease-out;

    &:hover {
        cursor: pointer;
        transform: translate(-5px, -5px);
        box-shadow: 5px 5px #000;
    }

    &:active {
        cursor: pointer;
        transform: translate(-3px, -3px);
        box-shadow: 3px 3px #000;
    }
`

export const LinkButton = styled.a`
    text-decoration: none;
    display: block;
    font-size: 2rem;
    border: none;
    background-color: #E11845;
    color: #fff;
    padding: 1rem 2rem;
    width: 100%;
    border: 2px solid #000;
    border-radius: 3px;
    transition: box-shadow .2s ease-out,
    transform  .2s ease-out;

    &:hover {
        cursor: pointer;
        transform: translate(-5px, -5px);
        box-shadow: 5px 5px #000;
    }

    &:active {
        cursor: pointer;
        transform: translate(-3px, -3px);
        box-shadow: 3px 3px #000;
    }
`

type NextLinkProp = {
    children: ReactNode,
    path: string
}

export const NextLink = ({children, path}: NextLinkProp) => {
    return (
        <>
            <Link href={path} className={styles["next-link"]}>
                {children}
            </Link>
        </>
    )
}

const IconButtonContainer = styled.div`
    background-color: #E4E4E7;
    border-radius: 100%;
    padding: .5em;
    cursor: pointer;
    text-align: center;

    display: flex;
    justify-content: center;
`

type IconButtonProps = {
    onClick?: () => void
}

export const EditIconButton = (props: IconButtonProps) => {
    return (
        <>
            <IconButtonContainer {...props}>
                <MdModeEditOutline size={20} />
            </IconButtonContainer>
        </>
    )
}

export const DeleteIconButton = (props: IconButtonProps) => {
    return (
        <>
            <IconButtonContainer {...props}>
                <MdOutlineDeleteOutline size={20} />
            </IconButtonContainer>
        </>
    )
}