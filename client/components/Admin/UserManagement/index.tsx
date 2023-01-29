'use client'

import { useRouter } from "next/router"
import styled from "styled-components"
import { useFetchUsers } from "../../../hooks/Users/useFetchUsers"
import { UserDataBody } from "../../../types/auth"
import { DeleteIconButton, EditIconButton, PrimaryButton } from "../../elements/Buttons"
import { ActionContainer, Table, TBody, TD, TH, THead, TR } from "../../elements/Tables"
import { H2, P } from "../../elements/Typography"
import { Card } from "../../layouts/Card"

type UserProps = {
    role: string
}

const UserManagementContainer = styled.div`
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

const UserManagementPage = ({role}: UserProps) => {
    const {data, isLoading} = useFetchUsers(role)

    if(isLoading) {
        return <P>Loading....</P>
    }

    return (
        <>
            <UserManagementContainer>
                <H2>{role}s</H2>
                <CategoryHeaderContainer>
                    <ActionButton>Test</ActionButton>
                </CategoryHeaderContainer>
                <Card>
                    <Table>
                        <THead>
                            <tr>
                                <TH scope="col">Id</TH>
                                <TH scope="col">Username</TH>
                                <th scope="col">Action</th>
                            </tr> 
                        </THead>
                        <TBody>
                            { data?.map((v, i)=> {
                                return (
                                <TR key={v.id}>
                                    <TH scope="row">
                                        {i + 1}
                                    </TH>
                                    <TD>
                                        {v.username}
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
            </UserManagementContainer>
        </>
    )
}

export default UserManagementPage