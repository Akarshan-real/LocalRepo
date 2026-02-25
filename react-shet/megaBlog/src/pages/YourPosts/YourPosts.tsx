import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newService from "../../appwrite/config";
import { Container, PostCard } from "../../components/index";
import { Link } from "react-router-dom";
import type { AppWriteTableType } from "../../Types/Table.type";
import { setLoading } from "../../store/uxSlice";

const YourPosts = () => {
    const loggedInUserInfo = useSelector((state: any) => state.auth);
    const [posts, setPosts] = useState<AppWriteTableType[] | null>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const hehe = async () => {
            dispatch(setLoading(true));
            const response = await newService.getPostsByUserId(loggedInUserInfo.userData.$id);

            if (response) {
                setPosts(response.rows);
            };
            dispatch(setLoading(false));
        };
        hehe();
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap gap-4">
                    {posts && posts.length !== 0 ?
                        posts.map((post: any) => (
                            <div key={post.$id}>
                                <PostCard
                                    {...post}
                                />
                            </div>
                        ))
                        :
                        <div className="w-full h-full mid">
                            <span className="text-3xl font-bold">
                                You dont have any post yet || <Link className="underline hover:no-underline text-blue-700" to={"/add-post"}>Post your first post</Link>
                            </span>
                        </div>
                    }
                </div>
            </Container>
        </div>
    )
};

export default YourPosts;
