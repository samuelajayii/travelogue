import { defineQuery } from "next-sanity";

export const POST_QUERY = defineQuery(
    `*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
  _id, _createdAt, date, images, slug, blogger -> {_id, name, image, bio},title, 
}`
)