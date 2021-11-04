const express = require("express");
const app = express();
const router = express.Router();
const axios = require("axios");
const NodeCache = require("node-cache");

//caching
let myCaching = new NodeCache();



router.get("/ping", (request, response) =>{
    try{
        return response.status(200).json({success: true});
    }catch(err){
        return response.status(400).json({success: false});
    }
});


router.get("/posts", async (request, response) =>{

    let searchQuery = request.query.tag;
    let sortBy = request.query.sortBy;
    let direction = request.query.direction;
    console.log(`se: ${searchQuery}`);
    console.log(`sort: ${sortBy}`);
    console.log(`direction: ${direction}`);


    if(searchQuery){
        await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${searchQuery}`)
        .then((dataReturned) =>{
            if(searchQuery === null || searchQuery === undefined || searchQuery === ""){
                return response.status(400).json({error:`Tags parameter is required`});
            }else{
                let myData = dataReturned.data.posts;
                let stringifiedData = JSON.stringify(myData);
                
                //cache data
                myCaching.set("posts", stringifiedData, 10000);
                let cachedData = myCaching.get("posts");
                if(cachedData !== undefined || cachedData !== null){
                    return response.status(200).json({posts:`${cachedData}`});
                }else{
                    return response.status(200).json({posts:`${stringifiedData}`});
                }
            }
        }).catch((err) =>{
            return response.status(400).json({error: `${err}`});
        });
    
    }
    else if(sortBy){

        await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${searchQuery}&sort=${sortBy}`)
        .then((dataReturned) =>{
            if(searchQuery === null || searchQuery === undefined || searchQuery === ""){
                return response.status(400).json({error:`Tags parameter is required`});
            }else if(sortBy === null || sortBy === undefined || sortBy === ""){
                return response.status(400).json({error: "sortBy parameter is invalid"});
            }else{
                let myData = dataReturned.data.posts.sort(sortBy);
                let stringifiedData = JSON.stringify(myData);
                //cache data
                myCaching.set("posts", stringifiedData, 10000);
                let cachedData = myCaching.get("posts");
                if(cachedData !== undefined || cachedData !== null){
                    return response.status(200).json({posts:`${cachedData}`});
                }else{
                    return response.status(200).json({posts:`${stringifiedData}`});
                }
            }
        }).catch((err) =>{
            return response.status(400).json({error: `${err}`});
        });
    }else if(direction){

        await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${searchQuery}&sort=${sortBy}&direction=${direction}`)
        .then((dataReturned) =>{
            if(searchQuery === null || searchQuery === undefined || searchQuery === ""){
                return response.status(400).json({error:`Tags parameter is required`});
            }else if(sortBy === null || sortBy === undefined || sortBy === ""){
                return response.status(400).json({error: "sortBy parameter is invalid"});
            }else{
                let myData = dataReturned.data.posts.sort(sortBy).sort(direction);
                let stringifiedData = JSON.stringify(myData);
                //cache data
                myCaching.set("posts", stringifiedData, 10000);
                let cachedData = myCaching.get("posts");
               
                if(cachedData !== undefined || cachedData !== null ){
                    return response.status(200).json({posts:`${cachedData}`});
                }else{
                    return response.status(200).json({posts:`${stringifiedData}`});
                }
            }
        }).catch((err) =>{
            return response.status(400).json({error: `${err}`});
        });
    }

    
       

});









module.exports = router;