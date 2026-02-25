import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import newService from "../../appwrite/config";
import { Button, Container } from "../../components/index";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import type { AppWriteExtendedTableType } from "../../Types/Extended.table.type";
import { setLoading } from "../../store/uxSlice";

export default function Post() {
    const [post, setPost] = useState<AppWriteExtendedTableType | null>(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state: any) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            dispatch(setLoading(true));
            try {
                if (slug) {
                    const response = await newService.getPost(slug);

                    if (response) {
                        setPost(response);
                    } else {
                        navigate("/");
                    }
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchPost();
    }, [slug, navigate, dispatch]);

    const deletePost = async () => {
        if (!post) return;

        dispatch(setLoading(true));
        try {
            const status = await newService.deletePost(post.$id);

            if (status) {
                await newService.deleteFile(post.featuredImage);
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return post ? (
        <div className="py-8 post bg-(--bg) text-(--text) min-h-screen">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={newService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-(--primary) text-white" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-(--danger)" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="bg-(--card) border border-(--border) rounded-2xl">
                    <div className="px-4 py-2 rounded-tl-2xl mb-6 bg-(--surface) border border-(--border) w-fit">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css px-4 py-2 w-full rounded-2xl bg-(--card) text-(--text)">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <div className="min-h-screen bg-(--bg)" />
    );
};