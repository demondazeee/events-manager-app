import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { authContext } from "../../store/AuthContext";
import { LinkButton, NextLink } from "../elements/Buttons";
import { LI, UL } from "../elements/Lists";
import { H2 } from "../elements/Typography";
import { PageContainer } from "../layouts/Container";

const HeaderContainer = styled.header`
    position: sticky;
    width: 100%;
    top: 0;
    background-color: #F43F5E;
    color: #fff;
    padding: 1rem;
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LogoContainer = styled.div`
    display: flex;
    cursor: pointer;
`
const NavMenuContainer = styled.div`
`

const NavMenuLists = styled(UL)`
    display: flex;
    gap: 2rem;
`

const AuthContainer = styled.div``

const AuthMenuLists = styled(UL)`
    display: flex;
    gap: 2rem;
`



const NavBar = () => {
    const auth = useContext(authContext)
    const router = useRouter()
    return (
        <>
            <HeaderContainer>
                <PageContainer>
                    <Nav>
                        <LogoContainer onClick={() => { router.push('/')}}>
                            <H2>Events</H2>
                        </LogoContainer>
                        <NavMenuContainer>
                            <NavMenuLists>
                                <LI>
                                    <NextLink path="/">Home</NextLink>
                                </LI>
                                <LI>
                                    <NextLink path="/events">Events</NextLink>
                                </LI>
                                <LI>
                                    <NextLink path="/events/search">Search Events</NextLink>
                                </LI>
                            </NavMenuLists>
                        </NavMenuContainer>
                        <AuthContainer>
                            <AuthMenuLists>
                                {auth?.isLoading ? 
                                <>
                                    <LI>
                                        <p>Loading...</p>
                                    </LI>
                                </>
                                :
                                auth?.isLoggedIn ? 
                                <>
                                    <LI>
                                        <LinkButton>Profile</LinkButton>
                                    </LI>
                                    <LI>
                                        <LinkButton onClick={(e)=> {
                                            e.preventDefault();
                                            auth?.logoutUser()
                                        }}>Logout</LinkButton>
                                    </LI>
                                </>
                                :
                                <>
                                    <LI>
                                        <LinkButton onClick={auth?.showLoginHandler}>Login</LinkButton>
                                    </LI>
                                    <LI>
                                        <LinkButton>Register</LinkButton>
                                    </LI>
                                </>
                                }
                            </AuthMenuLists>
                        </AuthContainer>
                    </Nav>
                </PageContainer>
            </HeaderContainer>
        </>
    )
}

export default NavBar;