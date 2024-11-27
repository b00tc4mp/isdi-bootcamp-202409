import bcrypt from 'bcryptjs';

const password = 'myPassword123';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('Password:', password);
console.log('Hash:', hash);
console.log('Password matches:', bcrypt.compareSync(password, hash));
