import { useEffect, useState } from "react"
import newService from "../../appwrite/config"
import { Container, PostCard } from "../../components/index"
import type { AppWriteTableType } from "../../Types/Table.type";
import { useDispatch, useSelector } from "react-redux";
import { setUserPosts } from "../../store/postSlice";

const Home = () => {
    const [posts, setPosts] = useState<AppWriteTableType[]>([]);
    const isLoggedIn = useSelector((state: any) => state.auth.status);

    const dispatch = useDispatch();

    const slugToNormal = (slug: string) => {
        const x = slug.replace(/\-+/g, " ").trim();
        
        return x[0].toUpperCase() + x.slice(1);
    };

    useEffect(() => {
        const hehe = async () => {
            const response = await newService.getPosts([]);

            const names: string[] = [];
            const slugs: string[] = [];

            if (response) {
                response.rows.forEach((row) => (
                    names.push(slugToNormal(row.$id)),
                    slugs.push(row.$id)
                ));

                dispatch(setUserPosts({ names: names, slugs: slugs }));

                setPosts(response.rows);
            }
        }
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
                            {isLoggedIn ? "Add post" : "Login to read posts"}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home
