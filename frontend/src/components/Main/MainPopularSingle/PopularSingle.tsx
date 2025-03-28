import { PopularSingleStyled } from "./styled";

// declares variables with their data types
export interface PopularSingleData {
  id: number;
  category: string;
  title: string;
  nickname: string;
  dateCreated: number;
  views: number;
}

// using functional component feature to wrap
// the above object SingleData into an object
// then this can be used by map to create
// recurring posts with the declared variables
interface PopularPostProps {
  post: PopularSingleData;
}

const PopularSingle = ({ post }: PopularPostProps) => {
  return (
    <>
      <PopularSingleStyled>
        <div className="popular-single">
          <div className="single-id">{post.id}</div>
          <div className="single-category">{post.category}</div>
          <div className="single-title">{post.title}</div>
          <div className="single-nickname">{post.nickname}</div>
          <div className="single-dateCreated">{post.dateCreated}</div>
          <div className="single-views">{post.views}</div>
        </div>
      </PopularSingleStyled>
    </>
  );
};

export default PopularSingle;
