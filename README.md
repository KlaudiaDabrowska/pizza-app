# Pizza Application

The Pizza App is simple and allows users to explore pizzas, ingredients and operations on the front-end. The backend supports all CRUD operations on collections. This README provides information on how to run the application using docker-compose, as well as details on its functionality and configuration.

---

## Requirements

To run the Pizza Application using docker-compose, you need to have the following tools installed on your system:

1. Docker
2. Docker Compose

**Running the Application**
To run the Pizza Application, follow these steps:

```sh

# Clone this repository
$ git clone https://github.com/KlaudiaDabrowska/pizza-app

# Go into the repository
$ cd pizza-app

# Run the application using docker-compose:
$ docker-compose up -d

```

## Testing

The Pizza Application includes tests for both the client and server components. To run the tests, use the following command:

```sh

$ npm run test

```

Running server tests locally requires lsb-release because these tests are executed against in memory mongoDB https://github.com/nodkz/mongodb-memory-server. You can also check the tests results via github actions.

Both client and server tests can be executed independently within their respective directories.

### Continuous Integration with GitHub Actions

The Pizza Application is integrated with GitHub Actions for automated testing. Each time a commit is pushed to the main branch or pull requests are created, the tests are automatically triggered. The GitHub Actions workflow configuration can be found in the repository's .github/workflows directory.
