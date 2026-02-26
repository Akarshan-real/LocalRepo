import { Container, PostForm, PrevPostsEdit } from "../../components/index";

const Addpost = () => {
    return (
        <div className="py-8 min-h-screen bg-(--bg) text-(--text)">
            <Container>
                <PostForm />
                <PrevPostsEdit className="mt-8 ml-2"/>
            </Container>
        </div>
    );
};

export default Addpost;
