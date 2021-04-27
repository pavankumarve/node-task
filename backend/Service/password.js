'use strict';

const argon2 =require('argon2');

const hashPassword  = (password) =>{
    return argon2.hash(password)
}

const verifyPassword=(plainPassword,hash) =>
{
    return argon2.verify(hash,plainPassword)
}

module.exports={
    hash:hashPassword,
    verify:verifyPassword
}