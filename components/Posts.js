import React, { useEffect, useState } from "react";
import profile from "../assets/profile.jpg";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return () => {
      unSubscribe();
    };
  }, [db]);

  return (
    <div className="mt-[15px] mx-1 ">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
          timestamp={post.data().timestamp}
        />
      ))}
    </div>
  );
};

export default Posts;
