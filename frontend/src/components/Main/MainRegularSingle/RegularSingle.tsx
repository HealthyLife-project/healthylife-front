import { RegularSingleStyled } from "./styled";

export interface RegularSingleData {
  id: number;
  category: string;
  title: string;
  nickname: string;
  dateCreated: number;
  views: number;
  comments: number;
  profileImg: File; // not sure HTMLImageElement or string
}

interface RegularPostProps {
  post: RegularSingleData;
}

const RegularSingle = ({ post }: RegularPostProps) => {
  return (
    <>
      <RegularSingleStyled>
        <div className="regular-single">
          <div className="single-id">{post.id}</div>
          <div className="single-category">{post.category}</div>
          <div className="single-title">{post.title}</div>
          <div className="single-nickname">{post.nickname}</div>
          <div className="single-dateCreated">{post.dateCreated}</div>
          <div className="single-views">{post.views}</div>
          <div className="single-comments"> {post.comments}</div>
          {/* <div className="single-profileImg">{post.profileImg}</div> */}
        </div>
      </RegularSingleStyled>
    </>
  );
};

export default RegularSingle;
