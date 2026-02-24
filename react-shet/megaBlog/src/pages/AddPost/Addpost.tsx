import { useState } from "react";
import { Container, PostForm, PrevPostsEdit } from "../../components/index";
import type { AppWriteExtendedTableType } from "../../Types/Extended.table.type";
import { useSelector } from "react-redux";

const Addpost = () => {
    const [post, setPost] = useState<AppWriteExtendedTableType | null>(null);
    const userData = useSelector((state: any) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    return (
        <div className="py-8">
            <Container>
                <PostForm />
                {isAuthor && <PrevPostsEdit className="mt-8 ml-2" />}
            </Container>
        </div>
    );
};

export default Addpost;
