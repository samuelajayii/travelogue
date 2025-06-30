"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPost = async (state, post, content) => {
    const session = await auth();
    if (!session) return JSON.parse(JSON.stringify({ error: "Not signed in" }))
    const { title, destination, date, images, } = Object.fromEntries(
        post.entries()
    );

    const uploadedImage = await writeClient.assets.upload('image', images);


    if (!title || typeof title !== "string") {
        return JSON.parse(
            JSON.stringify({ error: "Title is required and must be a string", status: "ERROR" })
        );
    }
    const imageReference = {
        _key: uploadedImage.assetId,
        _type: 'image',
        asset: {
            _type: 'reference',
            _ref: uploadedImage._id,  // Reference to the uploaded image's _id
        },
    };

    console.log(imageReference)
    const slug = slugify(title, { lower: true, strict: true });
    try {
        const session = await auth();
        
        const post = {
            title,
            destination,
            date,
            images: [imageReference],
            content,
            slug: {
                _type: "slug",
                current: slug,
            },
            blogger: {
                _type: "reference",
                _ref: session?.user.id,
            },
        };

        const result = await writeClient.create({ _type: "post", ...post });

        return JSON.parse(JSON.stringify({
            ...result,
            error: "",
            status: "SUCCESS",
        }));
    } catch (error) {
        console.error(error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        });
    }
};
