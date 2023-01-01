import { ReactNode } from "react"
import styled from "styled-components"



export const PageItemsContainer = styled.div `
    padding: 50px 0;
`

const PageItemListContainer = styled.div `
    display: flex;

    gap: 3rem;
`

const PageItem = styled.div `
    flex: 1;
   & > *:not(:last-child) {
    margin-bottom: 20px;
   }
`
const MainContainer = styled.div `
    flex: 2;

`

type PageContainerProp = {
    firstColumn?: ReactNode,
    mainColumn: ReactNode,
    lastColumn?: ReactNode
}

const PageContainer = ({firstColumn, mainColumn, lastColumn}: PageContainerProp) => {
    return (
        <>

            <PageItemsContainer>
                <PageItemListContainer>
                    <PageItem>
                        {firstColumn}
                    </PageItem>
                    <MainContainer> 
                        {mainColumn}
                    </MainContainer>
                    <PageItem>
                        {lastColumn}
                    </PageItem>
                </PageItemListContainer>
            </PageItemsContainer>
        </>
    )
}


export default PageContainer