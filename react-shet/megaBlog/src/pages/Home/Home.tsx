import { useEffect, useState } from "react"
import newService from "../../appwrite/config"
import { Container, PostCard, ScrollReveal } from "../../components/index"
import type { AppWriteTableType } from "../../Types/Table.type";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/uxSlice";
import { Link } from "react-router-dom";
import { heightOfHeaderAndFooter } from "../../Helper/Function";

const Home = () => {
    const [posts, setPosts] = useState<AppWriteTableType[]>([]);
    const [totalHeight, setTotalHeight] = useState<number>(0);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => setTotalHeight(heightOfHeaderAndFooter());
        window.addEventListener("resize",handleResize);
        return () => window.removeEventListener("resize",handleResize);
    }, []);

    useEffect(() => {
        const hehe = async () => {
            try {
                dispatch(setLoading(true));
                setTotalHeight(heightOfHeaderAndFooter())
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
    }, []);

    if (posts.length > 0) {
        return (
            <div className="w-full py-8 home bg-(--bg) text-(--text)">
                <Container>
                    <div className="flex flex-wrap gap-4">
                        {posts.map((post) => (
                            <ScrollReveal key={post.$id} delay={0.1}>
                                    <PostCard
                                        {...post}
                                    />
                            </ScrollReveal>
                        ))}
                    </div>
                </Container>
            </div>
        )
    };

    return (
        <div
            className="w-full flex flex-col items-center justify-center bg-(--bg) text-(--text) text-center py-4"
            style={{ minHeight: `calc(100vh - ${totalHeight}px)` }}
        >
            <h1 className="text-2xl font-bold hover:text-(--primary) transition">
                <Link to="/login" className="flex items-center justify-center">
                    Get started to explore posts
                </Link>
            </h1>
        </div>
    );
}

export default Home
