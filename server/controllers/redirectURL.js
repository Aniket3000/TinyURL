const { client, consistentHash } = require('../db');

const redirectURL = async (req, res) => {
  try{
    const {shortURL} = req.params;
    const assignedServer = consistentHash.get(shortURL);

    console.log(`Found ${shortURL} on ${assignedServer}!`)
    const urlData = await client.db(assignedServer).collection('shortUrls').findOne({
      shortId: shortURL
    })

    if(!urlData) return res.status(404).json({error:"Short URL not found"});
    
    return res.redirect(urlData.originalURL);

  }catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
}

module.exports = { redirectURL };