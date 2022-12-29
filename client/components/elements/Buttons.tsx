import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";
import styles from './link.module.css'

export const PrimaryButton = styled.button`
    display: block;
    font-size: 2rem;
    border: none;
    background-color: #F43F5E;
    color: #fff;
    padding: 1rem 2rem;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.25);

    &:hover {
        cursor: pointer;
        background-color: #FB7185;
    }
`

export const LinkButton = styled.a`
    text-decoration: none;
    display: block;
    font-size: 2rem;
    border: none;
    background-color: #F43F5E;
    color: #fff;
    padding: 1rem 2rem;
    width: 100%;
    border-radius: 50px;

    &:hover {
        cursor: pointer;
        background-color: #BE123C;
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