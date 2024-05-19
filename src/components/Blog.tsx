import Loader from "@/components/Loader";
import { BLOGS } from "@/data/blog";

import { PostEdge, Publication } from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
// import { graphql } from "../gql";

const query: any = gql(`
query FetchAllPosts($host: String!) {
  publication(host: $host) {
    posts(first: 0) {
      edges {
        node {
          id
          title
          slug
          subtitle
          coverImage {
            url
          }
          publishedAt
          views
          brief
        }
      }
    }
  }
}
`);
// const query: any = gql(`
// query FetchPost($slug: String!) {
//   publication(host: $host) {
//     post(slug: $slug) {
//       id
//       title
//       slug
//       subtitle
//       tags {
//         id
//         name
//       }
//       url
//       coverImage {
//         url
//       }
//       readTimeInMinutes
//       publishedAt
//       content {
//         markdown
//         html
//       }
//       views
//     }
//   }
// }
// `);

function truncateText(text: any, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

const Blog = () => {
  const blogs = BLOGS;

  const [publications, setPublications] = useState<Publication>();

  const { data, loading } = useQuery(query, {
    variables: { host: "mblessed.hashnode.dev" },
  });

  console.log("The data:", data);
  // console.log("The data:", info);

  useEffect(() => {
    setPublications(data?.publication);
  }, [data]);

  if (loading) return <Loader />;

  return (
    <div className="my-10 md:my-24 mx-4 md:mx-8" id="blog">
      <div className="text-start pt-16 mb-4 text-3xl font-semibold">Blogs</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {publications &&
          publications.posts.edges.map((post: PostEdge) => (
            <a
              key={post.node.id}
              href={`https://mblessed.hashnode.dev/${post.node.slug}`}
              target="_blank"
            >
              <div className="text-start flex flex-col justify-between bg-[#18173B] p-4 pt-4 pb-10 rounded-xl mx-auto hover:border hover:border-white h-[260px]">
                <div className="text-base font-semibold mb-4 h-3/6">
                  {truncateText(post.node.title, 50)}
                </div>

                <div className="font-extralight md:font-light mb-10 text-sm h-2/6">
                  {truncateText(post.node.subtitle, 65)}
                </div>

                <div className="text-end text-sm text-[#FFFFFF]/[0.6] h-1/6">
                  {post.node.views} views
                </div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};

export default Blog;
