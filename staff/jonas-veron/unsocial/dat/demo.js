import mongoose from "mongoose";

import models from "./models.js";

const { User, Post, Comment } = models;

mongoose
  .connect("mongodb://localhost/unsocial-test")
  //   .them(() => Promise.all([User.deleteMany({}), Post.deleteMany({})]))
  .then(() => {
    const user = new User({
      name: "Juan",
      email: "juan@torrico.com",
      username: "Juan",
      password: "123123123",
    });

    return user.save();
  })
  .then((user) => {
    console.log(user);

    const post = new Post({
      author: user._id,
      image:
        "https://t4.ftcdn.net/jpg/07/06/72/43/360_F_706724318_SilctpdLGPefFMlHGTRwxE8of2AveaIv.jpg",
      text: "hello world",
      date: new Date(),
    });

    const comment = new Comment({
      author: user._id,
      text: "que hacen los maquinas !?",
      date: new Date(),
    });
    post.comments.push(comment);

    return post.save();
  })
  .then((post) => {
    console.log(post);
  })
  .catch(console.error)
  .finally(() => mongoose.disconnect());
