import { useSelector } from "react-redux";
import { Container, PostForm, PrevPostsEdit } from "../../components/index";

const Addpost = () => {
    const userSlugs = useSelector((state : any) => state.allUserSlugs.slugs);
    return (
        <div className="py-8 min-h-screen bg-(--bg) text-(--text)">
            <Container>
                <PostForm />
                {userSlugs.length > 0 && <PrevPostsEdit className="mt-8 ml-2"/>}
            </Container>
        </div>
    );
};

export default Addpost;
