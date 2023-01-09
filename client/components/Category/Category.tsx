import styled from "styled-components"
import { CategoryDataBody } from "../../hooks/useCategory"
import { LI, UL } from "../elements/Lists"
import { H4, P } from "../elements/Typography"
import { Card } from "../layouts/Card"
import CategoryItem from "./CategoryItem"

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
const CategoryItemList = styled(UL)`
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
`


const Category = ({data}: CategoryProp) =>{
    if(!data){
        return <P>Loading...</P>
    }



    return (
        <>
            <Card>
                <CategoryContainer>
                    <H4>Choose an Event Category 💡</H4>
                    <CategoryItemList>
                        {data.length <= 0 ? <H4>Loading...</H4> :
                        [...data, {id: "1", name: "Others"}].map(c => {
                            return (
                               <CategoryItem key={c.id} id={c.id} name={c.name}/>
                            )
                        })
                        }
                    </CategoryItemList>
                </CategoryContainer>
            </Card>
        </>
    )
}

export default Category