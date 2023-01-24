'use client'

import styled from "styled-components"
import { Input } from "../elements/Inputs"
import { Card } from "../layouts/Card"

const SearchInput = styled(Input)`
    font-size: 2rem;
`

const Search = () => {
    return (
        <>
            <Card>
                <SearchInput placeholder="Search Events..."/>
            </Card>
        </>
    )
}

export default Search