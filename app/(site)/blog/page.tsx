"use client";
import BlogItem from "@/components/Blog/BlogItem";
import { deletePost, getAllBlog } from "@/services/api";
import { IBlog } from "@/types/blog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BlogPage = () => {
  const [blogList, setBlogList] = useState<IBlog[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const router = useRouter(); // Khởi tạo router

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllBlog();
      const { code, data, message } = res;
      if (code == 200 && data) {
        const tmp = data?.content?.map((el, index) => ({
          id: el?.id,
          title: el?.title,
          content: el?.content,
          author: el?.author,
          mainImage: listImg[index % 4],
        }));
        setBlogList(tmp);
      } else {
        toast.error(message);
      }
    };
    fetch();
  }, [reload]);

  const onDelete = async (id: number) => {
    try {
      let res = await deletePost(id);
      const { code, data, message } = res;
      if (code == 200) {
        toast.success(message);
        setReload(!reload);
      } else {
        toast.error(message);
      }
    } catch (error) {}
  };

  const onCreate = () => {
    router.push("blog/blog-create");
  };

  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="mb-4 mt-28 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            <button
              aria-label="signup with email and password"
              className="w-44 inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
              onClick={onCreate}
            >
              Create Post
              <svg
                className="fill-white"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                  fill=""
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {blogList.map((post, key) => (
              <BlogItem key={key} blog={post} onDelete={onDelete} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;

const listImg = [
  "/images/blog/blog-01.png",
  "/images/blog/blog-02.png",
  "/images/blog/blog-03.png",
  "/images/blog/blog-04.png",
];
