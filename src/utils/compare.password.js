import bcrypt from "bcryptjs";

export async function comparePassword(plain, hashed){
    return bcrypt.compare(plain, hashed);
}