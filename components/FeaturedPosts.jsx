import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { getRecentPosts } from "../service";
import { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;

  return (
    <button className="rounded-full py-2 px-3 bg-pink-500 text-white">
      <IoIosArrowBack />
    </button>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;

  return (
    <button className="rounded-full py-2 px-3 bg-pink-500 text-white">
      <IoIosArrowForward />
    </button>
  );
};

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      const featuredPosted = await getRecentPosts();
      setFeaturedPosts(featuredPosted);
    };

    fetchFeaturedPosts();
  }, []);

  return (
    <div className="w-full pt-10 pb-5">
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {Array.isArray(featuredPosts) &&
          featuredPosts.length > 0 &&
          featuredPosts.map(({ node: post }, idx) => {
            return (
              <div key={idx} className="w-full">
                <div className="w-[94%] mx-auto relative h-[270px]">
                  <img
                    src={post?.image?.url}
                    alt={post?.title}
                    className="w-full h-full rounded-lg mix-blend-darken"
                  />
                  <div className="py-5 px-5 absolute top-0 left-0 flex flex-col justify-end h-full">
                    <p className="text-gray-100">
                      {new Date(post?.createdAt).toDateString()}
                    </p>
                    <h5 className="text-lg text-white font-semibold">
                      {post?.title}
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
