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
            try {
                dispatch(setLoading(true));
                const response = await newService.getPosts([]);

                if (response) {
                    setPosts(response.rows);
                };
            } catch (error) {
                console.log(error);
            }
            finally {
                dispatch(setLoading(false));
            };
        };
        hehe();
    }, [dispatch]);

    if (posts.length > 0) {
        return (
            <div className="w-full py-8 home bg-(--bg) text-(--text)">
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
        <div className="w-full py-8 mt-4 bg-(--bg) text-(--text) text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-(--primary)">
                            {loggedInInfo.status
                                ? "No posts yet. Create your first one."
                                : "Login to explore posts."
                            }
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home
