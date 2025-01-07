"use client";
import React from "react";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Brands = () => {
  const { users } = useSelector((state: RootState) => state.users) || [];
  return (
    <div>
      {users && users.length != 0 && (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>website</th>
              <th>phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((el) => (
              <tr>
                <th>{el?.name}</th>
                <th>{el?.email}</th>
                <th>{el?.website}</th>
                <th>{el?.phone}</th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* <!-- ===== Clients Start ===== --> */}
      <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="grid grid-cols-3 items-center justify-center gap-7.5 md:grid-cols-6 lg:gap-12.5 xl:gap-29">
            {brandData.map((brand, key) => (
              <SingleBrand brand={brand} key={key} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Clients End ===== --> */}
    </div>
  );
};

export default Brands;
