import styled from "styled-components"
import { EventsDataBody } from "../../../types/events"
import { DeleteIconButton, EditIconButton, PrimaryButton } from "../../elements/Buttons"
import { ActionContainer, Table, TBody, TD, TH, THead, TR } from "../../elements/Tables"
import { H2 } from "../../elements/Typography"
import { Card } from "../../layouts/Card"

type EventsProps = {
    data: EventsDataBody[]
}


const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`
const CategoryHeaderContainer = styled(Card)`
    display: flex;
    justify-content: flex-end;
`

const ActionButton = styled(PrimaryButton)`
    font-size: 1.5rem;
    display: inline-block;
    width: initial;
`


const Events = ({data}: EventsProps) => {
    return (
        <>
            <EventsContainer>
                <H2>Events</H2>
                <CategoryHeaderContainer>
                    <ActionButton>Test</ActionButton>
                </CategoryHeaderContainer>
                <Card>
                    <Table>
                        <THead>
                            <tr>
                                <TH scope="col">Event Title</TH>
                                <TH scope="col">Owner</TH>
                                <th scope="col">Action</th>
                            </tr> 
                        </THead>
                        <TBody>
                            {data.map(v => {
                                return (
                                <TR key={v.id}>
                                    <TH scope="row">
                                        {v.title}
                                    </TH>
                                    <TD scope="row">
                                        {v.ownerName}
                                    </TD>
                                    <TD>
                                        <ActionContainer>
                                            <EditIconButton />
                                            <DeleteIconButton />
                                        </ActionContainer>
                                    </TD>
                                </TR>
                                )
                            })}
                        </TBody>
                    </Table>
            </Card>
            </EventsContainer>
        </>
    )
}

export default Events