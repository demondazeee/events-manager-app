import { useRef } from "react"
import styled from "styled-components"
import { useCreateCategory } from "../../../hooks/Category/useCreateCategory"
import { useDeleteCategory } from "../../../hooks/Category/useDeleteCategory"
import { CategoryDataBody } from "../../../types/category"
import { DeleteIconButton, EditIconButton, PrimaryButton } from "../../elements/Buttons"
import { FormActionContainer } from "../../elements/Forms"
import { Input } from "../../elements/Inputs"
import { ActionContainer, Table, TBody, TD, TH, THead, TR } from "../../elements/Tables"
import { H2 } from "../../elements/Typography"
import { Card } from "../../layouts/Card"

type CategoryProps = {
    data: CategoryDataBody[]
}

const CategoryContainer = styled.div`
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

export const Category = ({data}: CategoryProps) => {
    const createCategory = useCreateCategory()
    const deleteCategory = useDeleteCategory()
    const category  = useRef<HTMLInputElement>(null)

    return (
        <>
            <CategoryContainer>
            <H2>Category</H2>
            <CategoryHeaderContainer>
                <Input placeholder="Enter category" ref={category}/>
                <ActionButton onClick={(e) => {
                    e.preventDefault()
                    createCategory.mutate(category.current?.value!)
                }}>{createCategory.isLoading ? "Loading..." : "Add new Category"}</ActionButton>
            </CategoryHeaderContainer>
           <Card>
                <Table>
                    <THead>
                        <tr>
                            <TH scope="col">Category Name</TH>
                            <th scope="col">Action</th>
                        </tr> 
                    </THead>
                    <TBody>
                        {data.map(v => {
                            return (
                            <TR key={v.id}>
                                <TH scope="row">
                                    {v.name}
                                </TH>
                                <TD>
                                    <ActionContainer>
                                        <EditIconButton />
                                        <DeleteIconButton onClick={() => {deleteCategory.mutate(v.id)}} />
                                    </ActionContainer>
                                </TD>
                            </TR>
                            )
                        })}
                    </TBody>
                </Table>
           </Card>
            </CategoryContainer>
        </>
    )
}

export default Category