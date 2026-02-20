import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import newService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type PostType } from '../../Types/Post.type';

type FormType = {
    title: string,
    slug: string,
    image: FileList,
    status: "active" | "inactive",
    content: string,
};

type PostPropType = PostType & { slug: string, $id: string }

const PostForm = ({ post }: { post?: PostPropType }) => {
    const navigate = useNavigate();
    const userdata = useSelector((state: any) => state.user.userData);

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm<FormType>({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const submit = async (data: FormType & { image?: FileList }) => {
        if (post) {
            const file = data.image[0] ? await newService.uploadFile(data.image[0]) : null;

            if (file) {
                await newService.deleteFile(post.featuredImage);
            };

            const dbUpdate = await newService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : "",
            });

            if (dbUpdate) {
                navigate(`/post/${dbUpdate.$id}`);
            }
            else {
                const file = data.image[0] ? await newService.uploadFile(data.image[0]) : null;

                if (file) {
                    const fileId = file.$id;
                    const dbPost = await newService.createPost({
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        status: data.status,
                        featuredImage: fileId,
                        userId: userdata.$id
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    };
                };
            };
        };
    };

    const slugTransform = useCallback((value: unknown): string => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            };
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={newService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
