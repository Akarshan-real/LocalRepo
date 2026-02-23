import { useSelector } from "react-redux";
import { Container, PostForm } from "../../components/index";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Addpost = () => {
    const userPosts = useSelector((state: any) => state);

    useEffect(() => {
        console.log(userPosts);
    }, []);

    return (
        <div className="py-8">
            <Container>
                <PostForm />
                <div className="w-full">
                    {userPosts.names.map((name: string, index: number) => (
                        <Link to={`/edit-post/${userPosts.slug[index]}`} className="">
                            {name}
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Addpost;
