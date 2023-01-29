import { useContext } from "react";
import { authContext } from "../../store/AuthContext";
import { isUsers } from "../../types/auth";
import { useFetch } from "../useFetch";

export const usersApi = () => {
    const {fetchUrl} = useFetch();
    const auth = useContext(authContext)


    const getUsers = async (key?: string, role?: string) => {
        const res = await fetchUrl({
            paths: `user?role=${role ||"Admin"}`,
            method: 'GET',
            headerOptions: {
                'Authorization': `Bearer ${auth?.userData?.accessToken}`
            }
        })

        if(!res.ok){
            throw new Error()
        }

        const data: unknown = await res.json()
        if(isUsers(data)) {
            return data
        }

    }

    return {
        getUsers
    }
}