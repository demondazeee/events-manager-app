import { GetServerSideProps } from "next"
import AdminDashboard from "../../components/Admin"
import Category from "../../components/Admin/Category"
import { useGetCategory } from "../../hooks/Category/useGetCategory"
import { CategoryDataBody } from "../../types/category"

type CategoryPageProp = {
    data: CategoryDataBody[]
}

const CategoryPage = ({data}: CategoryPageProp) => {
    const category = useGetCategory(data)

    if(!data) {
        return <p>Loading...</p>
    }

    if(!category.data || category.isLoading) {
        return <p>Loading..</p>
    }
    

    return (
        <>
            <AdminDashboard>
                <Category data={category.data} />
            </AdminDashboard>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async () => {
    const url = process.env.NEXT_PUBLIC_SERVER
    const categoryRes = await fetch(`${url}/category`)


    if(categoryRes.ok) {
        const data = await categoryRes.json();

        return {
            props: {
                data
            }
        }
    }


    return {
        props: {
            data: [],
        }
    }
}

export default CategoryPage