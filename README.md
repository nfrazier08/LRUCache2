# LRUCache2

LRU cache NPM Package Notes:
DISPOSE - Function that is called on items when they are dropped from the cache. This can be handy if you want to close file descriptors or do other cleanup tasks when items are no longer accessible. Called with key, value. It's called before actually removing the item from the internal cache, so if you want to immediately put it back in, you'll have to do that in a nextTick or setTimeout callback or it won't do anything.

STALE - By default, if you set a maxAge, it'll only actually pull stale items out of the cache when you get(key). (That is, it's not pre-emptively doing a setTimeout or anything.) If you set stale:true, it'll return the stale value before deleting it. If you don't set this, then it'll return undefined when you try to get a stale entry, as if it had already been deleted.

has(key) - Check if a key is in the cache, without updating the recent-ness or deleting it for being stale.

del(key)- Deletes a key out of the cache.

forEach(function(value,key,cache), [thisp]) - Just like Array.prototype.forEach. Iterates over all the keys in the cache, in order of recent-ness. (Ie, more recently used items are iterated over first.)

rforEach(function(value,key,cache), [thisp]) - The same as cache.forEach(...) but items are iterated over in reverse order. (ie, less recently used items are iterated over first.)

keys() - Return an array of the keys in the cache.

values() - Return an array of the values in the cache.

length - Return total length of objects in cache taking into account length options function.

itemCount - Return total quantity of objects currently in cache. Note, that stale (see options) items are returned as part of this item count.

dump() - Return an array of the cache entries ready for serialization and usage with 'destinationCache.load(arr)`.

load(cacheEntriesArray) - Loads another cache entries array, obtained with sourceCache.dump(), into the cache. The destination cache is reset before loading new entries

https://www.npmjs.com/package/yallist