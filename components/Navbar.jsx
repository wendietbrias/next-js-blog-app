import Link from "next/link";
import { useEffect, useState } from "react";
import { getPostCategories } from "../service";

const Navbar = () => {
  const [categorieses, setCategorieses] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getPostCategories();
      setCategorieses(categories);
    };

    fetchCategories();
  }, []);

  return (
    <nav className="w-full flex justify-between border-b border-white pt-5 pb-5 uppercase">
      <Link href="/">
        <span className="font-bold text-3xl text-white cursor-pointer transition duration-300 hover:text-pink-500">
          Wen Blog
        </span>
      </Link>
      <ul className="flex items-center">
        {categorieses.map((category, idx) => (
          <li key={idx} className="ml-3">
            <Link href={`/categories/${category?.slug}`}>
              <span className="text-white font-bold text-md capitalize transition duration-300 hover:text-pink-500 cursor-pointer">
                {category?.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
