import newService from "../appwrite/config";

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const slugToNormal = (slug: string) => {
    if (slug) {
        const x = slug.replace(/\-+/g, " ").trim();
        return x[0].toUpperCase() + x.slice(1);
    };
    
    return "";
};

export const getPostBySlug = async (slug : string) => {
    const response = await newService.getPostsByUserId(slug);

    if (!response?.rows || response === null) {
        return null;
    };

    const mapped = response.rows.map((row) => {
        const id = row.$id;
        return {
            slug : id ,
            name : slugToNormal(id)
        };
    });

    return {
        names : mapped.map(m => m.name),
        slugs : mapped.map(m => m.slug)
    };
};