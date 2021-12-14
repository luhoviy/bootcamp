export function ErrorHandler(error, req, res, next) {
  res.status(500).json({
    message: error?.message || error || "Something went wrong...",
    code: 500
  });
}
