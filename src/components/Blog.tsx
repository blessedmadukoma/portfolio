import { BLOGS } from "@/data/blog";
import React from "react";

const Blog = () => {
  const blogs = BLOGS;

  return (
    <div className="md:my-24 mx-4 md:mx-6">
      <div className="text-start mx-5 md:mx-4 lg:mx-8 mb-8 text-3xl font-semibold">
        Blogs
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {blogs.map((blog, id) => (
          <a key={id} href={blog.link} target="_blank">
            <div className="text-start bg-[#18173B] p-4 rounded-xl h-[290px] mx-auto">
              <div className="text-base font-semibold md:text-xl mb-4 h-2/4">
                {blog.title}
              </div>

              <div className="font-extralight md:font-light mb-10 text-sm h-1/4">
                {blog.description}
              </div>

              <div className="text-sm text-[#FFFFFF]/[0.6] h-1/4">
                {blog.views} views
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blog;
