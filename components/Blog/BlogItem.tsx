"use client";
import { RootState } from "@/redux/store";
import { deletePost } from "@/services/api";
import { IBlog } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const BlogItem = ({ blog }: { blog: IBlog }) => {
  const { id, mainImage, title, content } = blog;
  const { isLogin } = useSelector((state: RootState) => state.auth);

  const onDelete = async () => {
    try {
      let res = await deletePost(4);
    } catch (error) {}
  };
  return (
    <>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
      >
        <Link href={`/blog/`} className="relative block aspect-[368/239]">
          <Image src={mainImage} alt={title} fill />
        </Link>

        <div className="px-4">
          <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            <Link href={`/blog/blog-details`}>
              {`${title.slice(0, 40)}...`}
            </Link>
          </h3>
          <p className="line-clamp-3">{content}</p>
        </div>
        {isLogin && (
          <div className="mt-2 flex justify-end gap-3">
            <button
              aria-label="signup with google"
              className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
            >
              Sửa
            </button>
            <button
              aria-label="signup with google"
              className="text-body-color dark:text-body-color-dark dark:shadow-two flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
              onClick={onDelete}
            >
              Xóa
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default BlogItem;
