import { defineQuery } from "next-sanity";

export const POST_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current) && !defined($search) ||  title match $search || location match $search || blogger->name match $search || destination match $search]{
  _id, _createdAt, date, images, slug, blogger -> {_id, name, image, bio},title, content, destination
}`
)


export const POST_BY_ID_QUERY = defineQuery(
  `*[_type == "post" && _id == $id][0]{
  _id, 
  _createdAt, 
  date,
  images,
  slug, 
  blogger -> {_id, name, image, bio},
  title,
  content,
  destination
}`
)

export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`
  *[_type == "blogger" && id == $id][0]{
      _id,
      id,
      name,
      email,
      image,
  }
  `);