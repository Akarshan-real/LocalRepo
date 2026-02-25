import { useEffect, useState } from "react"
import newService from "../../appwrite/config"
import { Container, PostCard } from "../../components/index"
import type { AppWriteTableType } from "../../Types/Table.type";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/uxSlice";

const Home = () => {
    const [posts, setPosts] = useState<AppWriteTableType[]>([]);
    const loggedInInfo = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        const hehe = async () => {
            dispatch(setLoading(true));
            const response = await newService.getPosts([]);

            if (response) {
                setPosts(response.rows);
            };
            dispatch(setLoading(false));
        };
        hehe();
    }, []);

    if (posts.length > 0) {
        return (
            <div className="w-full py-8 home">
                <Container>
                    <div className="flex flex-wrap gap-4">
                        {posts.map((post) => (
                            <div key={post.$id}>
                                <PostCard
                                    {...post}
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    };

    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            {loggedInInfo.status ? "Add post" : "Login to read posts"}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home
