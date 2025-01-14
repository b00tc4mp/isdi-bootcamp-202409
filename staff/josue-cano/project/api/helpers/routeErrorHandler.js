export default function routeErrorHandler(err, req, res, next) {
    console.error(err.stack);
    //res.status(500).json({ error: 'Something went wrong!' });

  // const err = new Error(`Invalid Route: ${req.url}`);
  //const err = NotFoundError(`Invalid Route`, { url: req.url });
  // err.status = 404;
  console.error(err.stack);

  next(err);
}

