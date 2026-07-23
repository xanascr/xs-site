export function cacheMiddleware(ttl = 300) {
  return async (req, res, next) => {
    const redis = req.app.locals.redis;
    if (!redis) return next();

    const key = `cache:${req.originalUrl}`;
    const cached = await redis.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const original = res.json.bind(res);
    res.json = async (data) => {
      await redis.setEx(key, ttl, JSON.stringify(data));
      original(data);
    };

    next();
  };
}
