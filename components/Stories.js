import React, { useEffect, useState } from "react";
import Story from "./Story";
import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";

const Stories = () => {
  const { data: session } = useSession();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    setStories(
      [...Array(30)].map(() => ({
        userId: faker.datatype.uuid(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      }))
    );
  }, []);

  return (
    <div>
      <div className="flex space-x-4 p-5 bg-white  border border-gray-200 rounded-lg overflow-scroll scrollbar-thin scrollbar-thumb-gray-300 mx-1 ">
        {session && (
          <Story
            key={session.user.id}
            username="Your Story"
            img={session.user.image}
          />
        )}

        {stories.map((story) => (
          <Story
            key={story.userId}
            username={story.username}
            img={story.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;
