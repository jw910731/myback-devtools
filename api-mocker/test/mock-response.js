export default class MockResponse {
  send(content) {
    this.content = content;
  }

  get() {
    return JSON.parse(this.content);
  }
}
