const shortid = require('shortid');
const { client, consistentHash } = require('../db');
const { BloomFilter } = require('bloom-filters');

const bloomFilter = new BloomFilter(1024, 5);

const shortenURL = async (req, res) => {
  const { originalURL } = req.body;
  if (!originalURL) return res.status(400).json({ error: "URL is required" });

  try {
    if (bloomFilter.has(originalURL)) {
      return res.status(400).json({ error: 'URL already exists!' })
    }
    const shortId = await shortid.generate();

    const assignedServer = consistentHash.get(shortId);
    console.log(`Stored ${shortId} on ${assignedServer}`);

    await client.db(assignedServer).collection('shortUrls').insertOne({
      originalURL: originalURL,
      shortId: shortId,
      clicks: 0,
    })
    bloomFilter.add(originalURL);
    console.log('Added to bloom filter');

    await redisClient.setEx(shortId,86400,originalURL);
    console.log('Added to Redis Server');



    return res.status(200).json({ shortenURL: `http://localhost:8800/api/shorten/${shortId}` });
    // return res.status(200).json({ shortURL:  });
  } catch (err) {
    console.log(err);
    return res.status(503).json(err);
  }
}

module.exports = { shortenURL };