import RegularSingle, {
  RegularSingleData,
} from "../MainRegularSingle/RegularSingle";
import { RegularPostsStyled } from "./styled";

interface RegularPostsProps {
  posts: RegularSingleData[];
}

const RegularPosts = ({ posts }: RegularPostsProps) => {
  return (
    <>
      <RegularPostsStyled>
        <div className="regular-posts">
          {posts.map((post) => (
            <RegularSingle key={post.id} post={post} />
          ))}
        </div>
      </RegularPostsStyled>
    </>
  );
};

export default RegularPosts;
