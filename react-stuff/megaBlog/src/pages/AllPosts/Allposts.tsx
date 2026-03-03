import { useEffect, useState } from "react";
import newService from "../../appwrite/config";
import { Container, PostCard, ScrollReveal } from "../../components/index";
import { type AppWriteTableType } from "../../Types/Table.type";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/uxSlice";

const Allposts = () => {
    const [posts, setPosts] = useState<AppWriteTableType[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch(setLoading(true));
            try {
                const response = await newService.getPosts([]);
                if (response) {
                    setPosts(response.rows);
                }
            } catch (err) {
                console.log(err);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchPosts();
    }, [dispatch]);

    return (
        <div className="bg-(--bg) text-(--text) min-h-screen py-8">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map((post , index) => (
                        <ScrollReveal key={post.$id} delay={index*0.2}>
                            <PostCard
                                $id={post.$id}
                                featuredImage={post.featuredImage}
                                title={post.title}
                            />
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Allposts
