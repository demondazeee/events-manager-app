
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
    isLoading: boolean;
    eventsData: EventsDataBody[];
    setDefaultData: (data: EventsDataBody[]) => void;
    fetchEvents: (category?: string) => Promise<void>;
    createEvent: (data: EventsDataBodyInput) => Promise<void>;
}
