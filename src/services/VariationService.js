import Http, { renewToken } from './https';

export default class VariationService {

  async getAttachmentsCompany(extraParams = {}) {
    const params = {...extraParams };

    const { data, status, text } = await Http.get(`/price-variations/`, {params});

    return { data, status, text };
  }

  async addPrice(pricevariation) {
    pricevariation.start_date = new Date(pricevariation.start_date).toISOString().split('T')[0];
    pricevariation.end_date = new Date(pricevariation.end_date).toISOString().split('T')[0];

    if (pricevariation.id) {
      return await Http.patch(`/price-variations/${pricevariation.id}/`, pricevariation);
    }
    return await Http.post(`/price-variations/`, pricevariation);

  }

  async updateAttachment(attachment) {
    const data = {
      description: attachment.description,
    }
    return await Http.patch(`/price-variations/${attachment.id}/`, data);
  }
  async getAttachments(document_id) {
    return await Http.post(`/price-variations/${document_id}`);
  }

  async delete(attachment_id) {
    return await Http.delete(`/price-variations/${attachment_id}`);
  }

}