const express = require('express');
const {MongoClient, ServerApiVersion} = require('mongodb');
const { createClient } = require('redis');
const ConsistentHash = require('consistent-hash')
const uri = process.env.uri;

const client = new MongoClient(uri,{
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const redisClient = createClient({url:process.env.redisurl});
const consistentHash = new ConsistentHash();

async function run() {
  try{
    await client.connect();
    await client.db("usersTable").command({ping:1});
    console.log("Successfully connected to mongodb");

    await redisClient.on('error',err => console.log('Redis Client Error',err)).connect();
    console.log('Redis also connected');

    consistentHash.add('server1')
    consistentHash.add('server2')
    consistentHash.add('server3')

  }catch(err){
    // console.log(err);
    console.log("Some error in mongodb or redis connection")
  }
}

// run();
module.exports = {run,client,consistentHash}//,redisClient};
// export default {run,client};
