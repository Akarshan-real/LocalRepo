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
        try {
            dispatch(setLoading(true));
            const hehe = async () => {
                if (slug) {
                    const response = await newService.getPost(slug);

                    if (response) {
                        setPost(response);
                    }
                    else {
                        navigate("/");
                    }
                }
                else {
                    navigate("/");
                };
            };
            hehe();
        } catch (error) {
            console.log(error);
        }
        finally {
            dispatch(setLoading(false));
        }

    }, [slug, navigate]);

    const deletePost = async () => {
        if (post) {
            dispatch(setLoading(true));
            const status = await newService.deletePost(post.$id);
            if (status) {
                newService.deleteFile(post.featuredImage);
                navigate("/");
            };
            dispatch(setLoading(false));
        };
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={newService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
};