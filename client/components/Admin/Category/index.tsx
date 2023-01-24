import { useRef } from "react"
import styled from "styled-components"
import { useCreateCategory } from "../../../hooks/Category/useCreateCategory"
import { useDeleteCategory } from "../../../hooks/Category/useDeleteCategory"
import { CategoryDataBody } from "../../../types/category"
import { PrimaryButton } from "../../elements/Buttons"
import { FormActionContainer } from "../../elements/Forms"
import { Input } from "../../elements/Inputs"
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

const Table = styled.table`
    width: 100%;
    font-size: 1.5rem;
    border-collapse:collapse;
    text-transform: uppercase;

    
`

const THead = styled.thead`
`

const TBody = styled.tbody`
    & > *:not(:last-child) {
        border-bottom: 1px solid #666;
    }

`
const TR = styled.tr`
    
`
const TH = styled.th`
    padding: 1rem;
    text-align: left;
`
const TD = styled.td`
    padding: 1rem;
`
const ActionContainer = styled.ul`
    display: flex;
    gap: 1rem;
    justify-content: center;
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
                                    <ActionButton>Edit</ActionButton>
                                    <ActionButton onClick={() => {deleteCategory.mutate(v.id)}}>
                                    {deleteCategory.isLoading ? "Loading..." : "Delete"}
                                    </ActionButton>                           
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