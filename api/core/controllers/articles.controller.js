import articlesService from "../services/articles.service.js";

class ArticlesController {
  getAll(req, res) {
    res.json(articlesService.getAll());
  }
}

export default new ArticlesController();
