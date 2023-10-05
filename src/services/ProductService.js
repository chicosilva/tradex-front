import Http, { renewToken } from "./https";

export default class ProductService {

  async addProduct(document) {
    return await Http.post('/products/', document);
  }

  async getAllDocuments(extraParams = {}) {
    const params = {...extraParams };

    const { data, status, text, statusCode } = await Http.get(`/products/`, {params});
    return { data, status, text, statusCode };
  }

  async getProductById(id) {
    const { data, status, text } = await Http.get(`/products/${id}/`);
    return { data, status, text };
  }

  async saveProduct(document) {
    if(document.profile == 'all'){
        document.profile = null;
    }
    const { data, status, text } = await Http.patch(`/products/${document.id}/`, document);
    
    return { data, status, text };
  }

  async delete(document_id) {
    return await Http.delete(`/products/${document_id}`);
  }

  async upload(files, document_id) {
    let formData = new FormData();

    formData.append("document", document_id);

    files.forEach(file=>{
      formData.append("image", file);
    });

    return await Http.patch(`/products/${document_id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }

}
