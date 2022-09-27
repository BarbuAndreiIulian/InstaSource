import React, { useEffect, useRef, useState } from "react";
import emojy from "../assets/emojy.png";
import hearth from "../assets/hearth.png";
import redhearth from "../assets/redhearth.png";
import commentImg from "../assets/comment.png";
import message from "../assets/message.png";
import dots from "../assets/dots.png";
import save from "../assets/save.png";
import Image from "next/image";
import Moment from "react-moment";
import { signIn, useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Post = ({ id, username, userImg, img, caption, timestamp }) => {
  console.log(id);
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  //When Likes update in the db update the likes in the app as well
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  //checking if he liked already
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  //When doble like deletes like from db
  //When clicked once add like
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.name,
      });
    }
  };

  //Comments useEffect - when coomments update in database update them in the app as well
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  //Send comments to db
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.name,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="border rounded-t-lg rounded-b-lg mb-4 bg-white">
      {/* Header */}
      <div className="flex justify-between w-full items-center p-3 ">
        <div className="flex items-center">
          <div className="h-8 w-8 mr-3">
            <img src={userImg} alt="" className="rounded-full" />
          </div>

          <div className="">
            <p className="font-semibold text-sm leading-[18px]">{username}</p>
            <p className=" text-xs ">Original Audio</p>
          </div>
        </div>
        <div className="h-6 w-6">
          <Image src={dots} alt="" />
        </div>
      </div>
      {/* Photo */}

      <img src={img} alt="" className="" />

      <div className="p-3 pb-1">
        {/* Buttons */}
        <div className="">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div className="Btn" onClick={session ? likePost : signIn}>
                {hasLiked ? <Image src={redhearth} /> : <Image src={hearth} />}
              </div>
              <div className="Btn">
                <Image src={commentImg} />
              </div>
              <div className="Btn">
                <Image src={message} />
              </div>
            </div>

            <div className="Btn ">
              <Image src={save} />
            </div>
          </div>
          <div className="customfont pt-2">
            <p>{likes.length} likes</p>
          </div>
        </div>

        {/* Caption */}
        <div className="flex mt-2 items-center">
          <p className="customfont mr-2">{username}</p>
          <p className="whitespace-nowrap truncate">{caption}</p>
        </div>
        {/* Comments */}
        <div className="">
          <p
            className={`text-sm  text-gray-500 mt-1 mb-2 cursor-pointer ${
              comments.length < 1 && "hidden"
            } `}
          >
            View all {comments.length} comments
          </p>

          <div
            className={`max-h-20  overflow-y-auto scrollbar-thin  scrollbar-thumb-gray-300 ${
              comments.length < 1 && "hidden"
            }`}
          >
            {comments.map((comment) => (
              <div className="" key={comment.id}>
                <div className="flex  items-center justify-between ">
                  <div className="flex items-center truncate">
                    <p className="customfont mr-2">{comment.data().username}</p>
                    <p className="  truncate">{comment.data().comment}</p>
                  </div>

                  <div className="flex h-3 w-3 cursor-pointer mr-3 shrink-0 ml-2">
                    <Image src={hearth} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TimeStamp Post */}
        <Moment className="text-[10px] text-gray-400 mt-3" fromNow>
          {timestamp?.toDate()}
        </Moment>

        {/* Input */}
        <div className="border-t -ml-3 -mr-3 mt-3 pt-1 "></div>
        <div
          className="flex justify-between p-2"
          onClick={session ? "" : signIn}
        >
          <div className="flex items-center">
            <div className="Btn mr-3">
              <Image src={emojy} />
            </div>
            <input
              className="border-none focus:ring-0 outline-0"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              id={id}
              enterkeyhint="done"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button
            className="font-bold text-sm mr-2 text-[#0095f6]"
            onClick={sendComment}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
