
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";

type PostStatusProps = {
  post?: Models.Document;
  userId: string
}

const PostStatus = ({ post, userId }: PostStatusProps) => {
  const likesList = post?.likes.map((user:Models.Document)=> user.$id)
  const [likes, setLikes] = useState(likesList);
  const [isSaved,setIsSaved] = useState(false);

  const {mutate: likePost} = useLikePost();
  const {mutate:savePost} = useSavePost();
  const {mutate:deleteSavedPost} = useDeleteSavedPost();

  const {data: currentUser} = useGetCurrentUser();
  
 const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId)

    if(hasLiked){
      newLikes = newLikes.filter((id)=> id !== userId);
    }else{
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({postId:post?.$id || '', likesArray:newLikes})
  };
  const handleSavePost = (e: React.MouseEvent) => { e.stopPropagation();

    if(savedPostRecord){
      setIsSaved(false);
     return deleteSavedPost(savedPostRecord.$id);
    }
    savePost({postId: post?.$id || '',userId})
    setIsSaved(true)
};
  return (
    <div className="flex justify-between items-center z-20 ">
      <div className="flex gap-3 m=r-5 mt-3">
        <img src={`${checkIsLiked(likes,userId)? "/public/assets/icons/liked.svg":"/public/assets/icons/like.svg"}`} alt="like" width={20} height={20} onClick={handleLikePost} className="cursor-pointer" />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-3 mr-5">
        <img src={isSaved ? "/public/assets/icons/saved.svg":"/public/assets/icons/save.svg"}   alt="save" width={20} height={20} onClick={handleSavePost} className="cursor-pointer" />
      </div>
      
    </div>
  )
}

export default PostStatus