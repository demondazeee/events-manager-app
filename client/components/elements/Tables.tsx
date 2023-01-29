import styled from "styled-components"

export const Table = styled.table`
    width: 100%;
    font-size: 1.5rem;
    border-collapse:collapse;
    text-transform: uppercase;

    
`

export const THead = styled.thead``

export const TBody = styled.tbody`
    & > *:not(:last-child) {
        border-bottom: 1px solid #666;
    }

`
export const TR = styled.tr` `

export const TH = styled.th`
    padding: 1rem;
    text-align: left;
`
export const TD = styled.td`
    padding: 1rem;
`
export const ActionContainer = styled.ul`
    display: flex;
    gap: 1rem;
    justify-content: center;
`