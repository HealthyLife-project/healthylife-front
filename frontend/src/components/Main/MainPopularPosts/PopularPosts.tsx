import { PopularPostsStyled } from "./styled";
import PopularSingle from "../MainPopularSingle/PopularSingle";
import { PopularSingleData } from "../MainPopularSingle/PopularSingle";

// posts defines the name of the property
// then PopularSingleData[] indicates that posts
// property is an array of objects where each
// object conforms to the PopularSingleData interface
interface PopularPostsProps {
  posts: PopularSingleData[];
}

const PopularPosts = ({ posts }: PopularPostsProps) => {
  return (
    <>
      <PopularPostsStyled>
        <div className="popular-posts">
          {posts.map((post) => (
            <PopularSingle key={post.id} post={post} />
          ))}
        </div>
      </PopularPostsStyled>
    </>
  );
};

export default PopularPosts;
