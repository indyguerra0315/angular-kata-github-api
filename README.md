# FrontendTrekksoftChallenge

### Author: Ing. Indira Guerra Rodriguez

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

## Online server 
Navigate to [Trekksoft Frontend Challenge](http://trekksoft-challenge.cubaworkers.com/)
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Trekksoft challenge
## Learning Competencies
- Challenge understanding.
- Implement Frontend application using React/Redux, patterns and best practices.
- Implement tests.
- Manipulate Input/API parsing correctly.

## The challenge

Create a React application that retrieves and displays [user repositories and organisations in Github](https://docs.github.com/en/rest)

---

## INPUT
An input to enter the username

## OUTPUT
One area to display the repositories of the user and another area to display the organisations

# SOLUTION

## Main Folders structure

The folder structure is focused on each functionality:
- `get-github-org`(list of users): groups the files that participate in the flow of filtering and displaying users.
- `get-github-users`(list of organizations): groups the files that participate in the flow of filtering and displaying organizations.

In addition we are going to find the folders:
- `search-result`: component that groups the two main functionalities.
- `shared`: files that will be common for the whole app as `interfaces`, `components`, `directives`, `interceptors`, `services`.

```
app
├── get-github-org
│   └── components
│   └── contracts
│   └── services
│
├── get-github-users
│   └── components
│   └── contracts
│   └── services
│
├── search-result
│
└── shared
│   └── components
│   └── contracts
│   └── directive
│   └── entities
│   └── interceptor
│   └── services
```

---

## Application flow:
- First the main page shows with a `search-input` component.
- When entering a text in the `input` and clicking the button, it redirects to the results page. If the field is empty the button will not be enabled (it is defined this way to have several pages and to be able to make the routing).
- The main component (`search-result`) subscribes to the routing change and set the `filter` status in the application.
- The `search-input` component subscribes to the `filter` state and updates its value (so that it takes value if the search path is accessed directly).
- The `users-list` and `companies-list` components are subscribed to the `filter` state, and when this state is updated they make a request to the corresponding service to search for data, and also update the `loading` state of the app.
- Through the `GithubOrgsService` and `GithubService` services the communication with the GitHub API is established and the obtained data is parsed.
- The `httperror` interceptor updates the `loading` state and the `error` state upon completion of the http request made by the services.
- The data is injected into the `list` component, from where the event to load more data and order in each of the columns is emitted.
- The `users-list` and `companies-list` components capture the `show more` event and make a request to the corresponding service to fetch data.

## For resolution:
- Design patterns, high cohesion and low coupling, were applied, applying SOLID principles.
- Some hexagonal architecture concepts were applied.
- Unit tests were performed: `search-input`, `companies-list`, `GithubOrgsService`.

## TODO list
- Create an intermediate layer between the `GithubOrgsService` and the `companies-list` component where the response data is adapted to the model.
- Implement more unit and integration tests.
- If there is an active order (asc or desc) when loading more data by clicking on the `Show more` that are ordered given that filter.
- Implement services to obtain each of the data to be visualized(ex: organization/people).

