import { useEffect, useState } from "react";
import newService from "../../appwrite/config";
import { Container, PostCard } from "../../components/index";
import { type AppWriteTableType } from "../../Types/Table.type";
import { useDispatch } from "react-redux";
import { setUserPosts } from "../../store/postSlice";


const Allposts = () => {
    const [posts, setPosts] = useState<AppWriteTableType[]>([]);
    const dispatch = useDispatch();

    const slugToNormal = (slug: string) => {
        return slug.replace("-", " ")[0].toUpperCase();
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
    );
};

export default Allposts
