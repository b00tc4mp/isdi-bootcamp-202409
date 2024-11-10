import registerUser from './registerUser.js';

try {
    registerUser('Coco Drilo', 'coco@drilo.com', 'cocodrilo', '123123123', '123123123')
} catch (error) {
    console.log(error);
}