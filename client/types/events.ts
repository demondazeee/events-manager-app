export type EventsDataBody = {
    id: string,
    headerImage: string,
    title: string,
    description: string,
    fromDate: string,
    toDate: string,
    location: string,
    category: string,
    isFree: boolean,
    isClosed: boolean,
    createdAt: string,
    ownerName: string
}

export type EventsDataBodyInput = {
    title: string,
    description: string,
    FromDate: string,
    ToDate: string,
    Location: string,
    Category: string,
    IsFree: boolean
}

export interface useEventsBody {
    isCreateMode: boolean;
    setCreateModeHandler: (isCreate: boolean) => void;
}


export const isEvent = (data: unknown): data is EventsDataBody => {
    if(data != null && typeof data === "object"){
        if("title" in data) {
            return typeof data.title === "string"
        }
    }
    
    return false
}

export const isEvents = (data: unknown): data is EventsDataBody[] => {
    if(data != null){
        return typeof data === "object"
    }
    
    return false
}