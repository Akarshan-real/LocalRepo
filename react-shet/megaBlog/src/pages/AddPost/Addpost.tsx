import { useSelector } from "react-redux";
import { Container, PostForm } from "../../components/index";

const Addpost = () => {
    const userPosts = useSelector((state: any) => state.allUserPosts);

    return (
        <div className="py-8">
            <Container>
                <PostForm />
                <div className="w-full">
                    {userPosts.names.map((name: string, index: number) => (
                        <div className="">
                            {name}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
};

export default Addpost;
