import createPost from './createPost.js';

try {
  createPost('m2vvw4xzn6d', 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg', 'instagram por fa')  
} catch (error) {
    console.error(error);
};  // test fails cannot find uers data file, filled temp. for other tests
//need to fix create post logic and test