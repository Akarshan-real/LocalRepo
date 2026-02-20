import { useEffect, useState } from 'react';
import { Container, PostForm } from "../../components/index";
import newService from '../../appwrite/config';
import { type AppWriteExtendedTableType } from '../../Types/Extended.table.type';
import { useNavigate, useParams } from 'react-router-dom';

const Editpost = () => {
    const [post, setPost] = useState<AppWriteExtendedTableType | null>(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const hehe = async () => {
            if (slug) {
                const response = await newService.getPost(slug);

                if (response) {
                    setPost(response);
                }
            }
            else {
                navigate("/");
            }
        };
        hehe();
    }, [slug, navigate]);

    const mapPostToForm = (post: AppWriteExtendedTableType): AppWriteExtendedTableType & {slug : string} => {
        return {
            ...post,
            slug: post.$id,
            status: post.status === "inactive" ? "inactive" : "active"
        };
    };

    if (post) {
        return (
            <div className='py-8'>
                <Container>
                    <PostForm
                        post={mapPostToForm(post)}
                    />
                </Container>
            </div>
        );
    };

    return null;
}

export default Editpost
