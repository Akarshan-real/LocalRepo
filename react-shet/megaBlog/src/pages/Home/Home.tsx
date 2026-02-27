import { useEffect, useState } from "react"
import newService from "../../appwrite/config"
import { Container, PostCard, ScrollReveal } from "../../components/index"
import type { AppWriteTableType } from "../../Types/Table.type";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/uxSlice";
import { Link } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState<AppWriteTableType[]>([]);
    const [totalHeight, setTotalHeight] = useState<number>(0);

    useEffect(() => {
        const calculate = () => {
            const footer = document.querySelector("footer");
            const header = document.querySelector("header");

            const footerHeight = footer ? (footer as HTMLElement).offsetHeight : 0;
            const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;

            setTotalHeight(footerHeight + headerHeight);
        };

        setTimeout(calculate, 100);
        window.addEventListener("resize", calculate);
        return () => window.removeEventListener("resize", calculate);
    }, []);


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
