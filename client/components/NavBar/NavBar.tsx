import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { authContext } from "../../store/AuthContext";
import { eventContext } from "../../store/EventContext";
import { LinkButton, NextLink } from "../elements/Buttons";
import { LI, UL } from "../elements/Lists";
import { H2, P } from "../elements/Typography";
import { ContainerLayout } from "../layouts/Container";

const HeaderContainer = styled.header`
    position: sticky;
    width: 100%;
    top: 0;
    padding: 1rem;
    background-color: #fff;
    border-bottom: 1px solid #000;

    z-index: 100;
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
    align-items: center;

`

const NavBar = () => {
    const auth = useContext(authContext)
    const event = useContext(eventContext)

    if(auth == null) {return <P>Loading...</P>}
    const router = useRouter()
    return (
        <>
            <HeaderContainer>
                <ContainerLayout>
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
                                {auth.refresh.isLoading ? 
                                <>
                                    <LI>
                                        <P>Loading...</P>
                                    </LI>
                                </>
                                :
                                auth.isLoggedIn ? 
                                <>
                                    <LI>
                                        <NextLink path={`/profile/${auth.userData?.username}`}>Profile</NextLink>
                                    </LI>
                                    <LI>
                                        <LinkButton onClick={(e)=> {
                                            e.preventDefault();
                                            auth.logout.mutate()
                                            event?.setCreateModeHandler(false)
                                        }}>{auth.logout.isLoading ? "Loading..." : "Logout"}</LinkButton>
                                    </LI>
                                </>
                                :
                                <>
                                    <LI>
                                        <LinkButton onClick={auth?.showLoginHandler}>Login</LinkButton>
                                    </LI>
                                    <LI>
                                        <NextLink path="/manager/login">For Managers</NextLink>
                                    </LI>
                                </>
                                }
                            </AuthMenuLists>
                        </AuthContainer>
                    </Nav>
                </ContainerLayout>
            </HeaderContainer>
        </>
    )
}

export default NavBar;