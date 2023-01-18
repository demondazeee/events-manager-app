import { useState } from "react";
import { CategoryDataBody } from "../../types/category";

export type useCategoryProp = {
    isLoading: boolean;
    categoryData: CategoryDataBody[];
    fetchEvents: () => Promise<void>;
}

export const useCategory = () => {
    const [categoryData, setCategoryData] = useState<CategoryDataBody[]>([])

    

    return {}
}