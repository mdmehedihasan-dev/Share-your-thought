/* eslint-disable react/prop-types */

const GridView = ({ post }) => {
  return (
    <>
      {post.images !== null && (
        <div className="w-[48%]  px-2 py-1 ">
          {post.images && post.images.length && (
            <div
              className={`relative ${
                post.images.length === 1
                  ? "w-full h-full overflow-hidden"
                  : post.images.length === 2
                  ? "overflow-hidden h-full w-full grid grid-cols-2 gap-2"
                  : post.images.length === 3
                  ? "w-full h-full overflow-hidden grid grid-cols-2 gap-2"
                  : post.images.length === 4
                  ? "w-full h-full overflow-hidden grid grid-cols-2 gap-2"
                  : post.images.length >= 5
                  ? "w-full h-full overflow-hidden grid grid-cols-2 gap-2"
                  : "overflow-hidden"
              }`}
            >
              {post.images.slice(0, 4).map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt="images"
                  className={`object-cover w-full h-full ${
                    post.images.length === 3
                      ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3"
                      : post.images.length === 4 &&
                        "[&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3"
                  }`}
                />
              ))}
              {post.images.length >= 5 && (
                <div className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-white-100 bottom-36 right-36 opacity-65 ">
                  <span className="text-base font-gilroyBold">
                    +{post.images.length - 4}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GridView;
