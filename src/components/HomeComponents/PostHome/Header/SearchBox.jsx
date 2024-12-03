import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../../../../svg/SearchIcon";
import { useSearchQueryMutation } from "../../../../features/api/authApi";
import { Link } from "react-router-dom";
import avatarImage from "../../../../assets/defaultImage/avatar.png";


const SearchBox = () => {
  const [iconShow, setIconShow] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery] = useSearchQueryMutation();

  const focusInput = useRef(null);

  useEffect(() => {
    focusInput.current.focus();
  }, []);
  // for search  
  const handleSearch = async () => {
    if (searchTerm == "") {
      setSearchTerm();
    } else {
      const response = await searchQuery(searchTerm).unwrap();
      setSearchResult(response);
    }
  };


  return (
    <div className="w-[300px] z-10  bg-white rounded-md  min-h-[400px] px-[25px] py-2 max-h-[70vh] box-border shadow-md">
      <div className="flex items-center px-4 py-3 border rounded-full border-secondary_color gap-x-3">
        {iconShow && (
          <div
            onClick={() => focusInput.current.focus()}
            className="cursor-pointer text-secondary_color "
          >
            <SearchIcon />
          </div>
        )}
        <div>
          <input
            ref={focusInput}
            type="text"
            placeholder="Search"
            className="focus:outline-none font-gilroyRegular"
            onFocus={() => setIconShow(false)}
            onBlur={() => setIconShow(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>
      </div>
      <div>
        <p className="m-2 text-base font-gilroyBold">Recent Searchs</p>
      </div>
      <div className="mt-4">
        {searchResult == "" && (
          <p className="text-sm text-black font-gilroyMedium">
            Recent Searches
          </p>
        )}
        {/* {getSearchHistory &&
          searchResult == "" &&
          getSearchHistory
            .slice()
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((singleUser) => ( */}
              <div
                // key={singleUser?.user?._id}
                className="flex items-center w-full mt-5 gap-x-3"
                // onClick={() => handleAddSearchHistory(singleUser?.user?._id)}
              >
                <div className="flex items-center w-4/5 gap-x-3">
                  <div className="w-12 h-12 overflow-hidden rounded-full">
                    {/* <Link to={`/profile/${singleUser?.user?.username}`}>
                      <img
                        src={singleUser?.user?.profilePicture || avatarImage}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </Link> */}
                  </div>
                  <div>
                    <Link
                      // to={`/profile/${singleUser?.user?.username}`}
                      className="text-base text-black font-gilroyMedium"
                    >
                      {/* {singleUser?.user?.fName} {singleUser?.user?.lName} */}
                    </Link>
                  </div>
                </div>
                {/* <div
                  className="flex items-center justify-center w-10 h-10 text-black transition-all duration-75 ease-linear rounded-full cursor-pointer hover:bg-blue hover:text-white"
                  onClick={() => handleRemoveSearch(singleUser?.user?._id)}
                >
                  <CrossIcon/>
                </div> */}
              </div>
            {/* ))} */}
        <div className="mt-3">
          {searchResult
            ? searchResult?.map((result) => (
                <div
                  key={result._id}
                  className="flex items-center w-full mt-5 gap-x-3"
                  // onClick={() => handleAddSearchHistory(result._id)}
                >
                  <div className="w-12 h-12 overflow-hidden rounded-full">
                    <Link to={`/profile/${result?.username}`}>
                      <img
                        src={result?.profilePicture || avatarImage}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`/profile/${result?.username}`}
                      className="text-base text-black font-gilroyMedium"
                    >
                      {result.fName} {result.lName}
                    </Link>
                  </div>
                </div>
              ))
            : "No Search available"}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
