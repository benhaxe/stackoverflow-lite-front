class App {
  constructor() {
    this.token = null;
  }

  checkLogin() {
    this.token =
      window.localStorage.getItem('token') ||
      window.sessionStorage.getItem('token');
  }

  render(template) {
    this.body = template;
    document.body.innerHTML = this.body;
  }
  init() {
    if (this.token) {
      return fetch('localhost:3000/questions').then((response) => ({
        path: 'home',
        data: response.json(),
      }));
    }

    return import(/*webpackChunkName:"login"*/ './login/login').then(
      (data) => ({ path: 'login', template: `${data.default}` }),
    );
  }
}

const app = new App();
app.init().then((data) => {
  if (data.path !== 'home') {
    history.pushState({}, `${data.path} Page`, data.path);
    app.render(data.template);
  } else {
    console.log(data);
  }
});
