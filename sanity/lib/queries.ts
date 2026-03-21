import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(
    `*[_type=="events" && defined(slug.current) && !defined($search) || title match $search || category match $search || manager->name match $search ] | order(_createdAt desc) {
  _id, 
  title,
  slug,
  _createdAt,
  manager-> {
    _id, name, image, bio
  }, 
  attendees,
  description,
  category,
  image
}`
)

export const STARTUP_BY_ID_QUERY = defineQuery(
    `*[_type=="events" && _id == $id][0] {
        _id,
        title,
        slug,
        _createdAt,
        manager-> {
            _id, name,username, image, bio
        }, 
        attendees,
        description,
        category,
        image,
        eventDateTime
    }`
)

export const STARTUP_VIEWS_QUERY = defineQuery(
    `*[_type=="events" && _id == $id][0] {
        _id , attendees
    }`
)

export const MANAGER_BY_GITHUB_ID_QUERY = defineQuery(
    `*[_type=="manager" && id == $id][0] {
        _id, id, name, username, email, image, bio
    }`
)
