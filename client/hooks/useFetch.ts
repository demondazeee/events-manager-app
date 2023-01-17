type FetchBody = {
    paths: string,
    method: string,
    headerOptions?: {
        "Authorization"?: string
    },
    fetchOptions?: {
        body?: any
    }
}


export const useFetch = () => {
    const URL = process.env.NEXT_PUBLIC_SERVER
    const fetchUrl = async ({paths, method, headerOptions, fetchOptions}: FetchBody) => {
        const res = await fetch(`${URL}/${paths}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headerOptions
            },
            credentials: "include",
            ...fetchOptions
        })

        return res
    }


    return {fetchUrl}
}