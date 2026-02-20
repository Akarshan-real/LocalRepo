import { useEffect, useState } from "react";
import newService from "../../appwrite/config";
import { Container, PostCard } from "../../components/index";
import { type AppWriteTableType } from "../../Types/Table.type";


const Allposts = () => {
    const [posts, setPosts] = useState<AppWriteTableType[]>([]);

    useEffect(() => {
        const hehe = async () => {
            const response = await newService.getPosts([]);
            if (response) {
                setPosts(response.rows);
            }
        }
        hehe();
    }, [])

    return (
        <div>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard
                                $id={post.$id}
                                featuredImage={post.featuredImage}
                                title={post.title}                               
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Allposts
