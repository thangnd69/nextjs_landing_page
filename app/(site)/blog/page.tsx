"use client";
import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { IBlog } from "@/types/blog";
import { getAllBlog, getAllBlogRes } from "@/services/api";
import toast from "react-hot-toast";

const BlogPage = () => {
  const [blogList, setBlogList] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllBlog();
      const { code, data, message } = res;
      if (code == 200 && data) {
        const tmp = data?.content?.map((el) => ({
          id: el?.id,
          title: el?.title,
          content: el?.content,
          author: el?.author,
          mainImage: el?.mainImage,
        }));
        setBlogList(tmp);
      } else {
        toast.error(message);
      }
    };
    fetch();
  }, []);
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {blogList.map((post, key) => (
              <BlogItem key={key} blog={post} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
