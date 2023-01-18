export type CategoryDataBody = {
    id: string,
    name: string
}

export const isCategories = (data: unknown): data is CategoryDataBody[] => {
    if(data != null && typeof data === "object"){
        return typeof data === "object"
    }
    return false
}