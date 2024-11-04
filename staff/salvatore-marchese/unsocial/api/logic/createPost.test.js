import createPost from './createPost.js'

try {
    createPost('m2eo2tqvg06', 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg', 'hola patagonia')
} catch (error) {
    console.error(error)
}