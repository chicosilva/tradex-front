

export default class SharedService {
  formatErrorMessage(property, data) {
    if (typeof data === "object") {
      return data[property].detail;
    } else {
      console.log(property);
      return `${property}: ${data[property]}`;
    }
  }
}
