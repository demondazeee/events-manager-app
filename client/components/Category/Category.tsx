import styled from "styled-components"
import { CategoryDataBody } from "../../hooks/useCategory"
import { LI, UL } from "../elements/Lists"
import { H4 } from "../elements/Typography"
import { Card } from "../layouts/Card"

type CategoryProp = {
    data: CategoryDataBody[]
}

const CategoryContainer = styled.div `
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const CategoryButton = styled.a`
    width: 100%;
`

const Category = ({data}: CategoryProp) =>{
    return (
        <>
            <Card>
                <CategoryContainer>
                    <H4>Choose an Event Category 💡</H4>
                    <UL>
                        {data.length <= 0 ? <H4>Loading...</H4> :
                        data.map(c => {
                            return (
                                <LI key={c.id}>
                                    <CategoryButton>{c.name}</CategoryButton>
                                </LI> 
                            )
                        })
                        }
                    </UL>
                </CategoryContainer>
            </Card>
        </>
    )
}

export default Category