import { useEffect, useState } from "react"
import newService from "../../appwrite/config"
import { Container, PostCard } from "../../components/index"
import type { AppWriteTableType } from "../../Types/Table.type";
import { useSelector } from "react-redux";

const Home = () => {
    const [posts, setPosts] = useState<AppWriteTableType[]>([]);
    const isLoggedIn = useSelector((state : any) => state.auth.status);

    useEffect(() => {
        const hehe = async () => {
            const response = await newService.getPosts();

            if (response) {
                setPosts(response.rows);
            };
        };
        hehe();
    }, []);

    if (posts.length > 0) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
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
                            {isLoggedIn ? "Add post" : "Login to read posts"}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home
