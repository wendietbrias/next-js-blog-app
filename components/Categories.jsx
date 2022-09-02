import { getPostCategories, getCategoriesPosts } from "../service";
import { useState, useEffect } from "react";
import Link from "next/link";

const Categories = () => {
  const [categorieses, setCategorieses] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getPostCategories();
      setCategorieses(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full px-5 bg-white rounded-md ">
      <h5 className="text-xl font-bold  py-3 border-b  rounded-md border-gray-200">
        Categories
      </h5>
      <ul className="pt-2 pb-3">
        {categorieses?.map((category, idx) => (
          <li key={idx} className="my-1 border-b border-gray-200 py-2">
            <Link href={`/categories/${category?.slug}`}>
              <span className="text-md font-medium text-gray-700 cursor-pointer">
                {category?.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
