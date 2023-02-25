class Response {
  constructor(data = null, errors = null) {
    this.data = data;
    this.errors = errors;
  }
  success(res) {
    return res.status(200).json({
      status: "Success",
      data: this.data,
    });
  }
  created(res) {
    return res.status(201).json({
      status: "Created",
      data: this.data,
    });
  }
  error500(res) {
    return res.status(500).json({
      status: "Error",
      errors: this.errors,
    });
  }
  error400(res) {
    return res.status(400).json({
      status: "Bad Request",
      errors: this.errors,
    });
  }
  notFound(res) {
    return res.status(404).json({
      status: "Not Found",
      data: "",
    });
  }
}

module.exports = Response;