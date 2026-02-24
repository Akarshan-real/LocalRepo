import { useDispatch } from "react-redux";
import newService from "../appwrite/config";
import { setUserPosts } from "../store/postSlice";

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const slugToNormal = (slug: string) => {
    const x = slug.replace(/\-+/g, " ").trim();

    return x[0].toUpperCase() + x.slice(1);
};

export const updateReduxSlugs = async () => {
    const dispatch = useDispatch();
    const response = await newService.getPosts([]);

    let newNames: string[] = [];
    let newSlugs: string[] = [];

    if (response) {
        response.rows.forEach((row) => (
            newNames.push(slugToNormal(row.$id)),
            newSlugs.push(row.$id)
        ));
    };

    dispatch(setUserPosts({ names: newNames, slugs: newSlugs }));
}