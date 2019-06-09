# LRUCache2

Prior to this assignment, I had little working knowledge of an LRU cache and how it worked, so I used the following materials to learn more about LRU cache and how it worked:

Resources:

Wikipedia:
https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)

YouTube Video:
https://www.youtube.com/watch?v=R0GTqg3pJKg
https://www.youtube.com/watch?v=S6IfqDXWa10&t=1s

Medium article on how to code LRU cache in JS:
https://medium.com/dsinjs/implementing-lru-cache-in-javascript-94ba6755cda9
https://leetcode.com/problems/lru-cache/discuss/299332/Javascript-Hash-%2B-DoublyLinkedList-ES6-Classes

LRU Cache example in Python:
https://www.kunxi.org/2014/05/lru-cache-in-python/

To set up a web app and write an API, I referred to a project I worked on in the past:
https://github.com/CheekyMonkeyAcademy/WritingAcademy

I installed the following npm package to implement an LRU Cache into the app:
https://www.npmjs.com/package/lru-cache-node

Walk-through:
Since the defined cache size for this assignment was large, I tested with a smaller cache size of 3 and manually set values:

cache.set('a', '7');
cache.set('b', '5');
cache.set('c', '3');

When a user hits "/api/mars/:latitude/:longitude", I first validate that the inputs are within the specified range (latitude: -90 to 90; longitude: -180 to 180). If the inputs check out, I call the determineKeyFromLatLongInputs function. 

Since each location has a corresponding latitude/longitude value, this function would use an API to determine the location of the inserted latitude/longitude values. I hard coded some values in this function to assign to the 'key' variable. 

From here I called the getImageURL function, which takes the corresponding key defined in the previous function as a parameter. 

In the getImageURL function, I use a defined method on the cache object, called 'contains'. By calling, cache.contains(key), a boolean value will be returned indicating if the key has a corresponding image in the cache. 

If the value is true, the cache.get(key) method is initiated. This method updates the "recently-used"-ness of the key; adding the key/value pair as most recently used (ie. head) item in the cache. 

If the value is false, I would implement a function that access a database for an image or scrapes a website for an image and adds it to the cache. For the purposes of this assignment, I hard coded fourth value to be added to the cache. 

Since I was testing with a cache size of 3, this action ejects the LRU item, in this test case, that would be 'a', and the new cache would log as:


    [   { key: 'e', value: '15' },
        { key: 'c', value: '3' },
        { key: 'b', value: '5' } 
    ]



