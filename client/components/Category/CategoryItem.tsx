import { useContext } from "react"
import styled from "styled-components"
import { CategoryDataBody } from "../../hooks/useCategory"
import { eventContext } from "../../store/EventContext"
import { LI } from "../elements/Lists"
import { P } from "../elements/Typography"
import { Card } from "../layouts/Card"

const CategoryItemContainer = styled(Card)`
    box-shadow: none;
    padding: 5px;
    transition: box-shadow .2s ease-out,
    transform .2s ease-out;

    &:hover {
        cursor: pointer;
        box-shadow: 4px 4px #000;
        transform: translate(-4px, -4px);
    }

    &:active {
        cursor: pointer;
        box-shadow: 3px 3px #000;
        transform: translate(-3px, -3px);
    }
`


const CategoryItem = ({id, name}: CategoryDataBody) => {

    const events = useContext(eventContext)

    return ( 
        <LI onClick={() => {
            events?.fetchEvents(name)
        }}>
            <CategoryItemContainer>
                <P>{name}</P>
            </CategoryItemContainer>
        </LI>
    )
}

export default CategoryItem