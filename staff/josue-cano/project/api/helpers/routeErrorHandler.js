export default function routeErrorHandler(err, req, res, next) {
  console.error(err.stack);

  console.error(err.stack);

  next(err);
}
