language: node_js
node_js:
  - "12"
  - "14"
  - "16"
# Specify the operating system
os:
  - linux
  - osx
# Cache dependencies
cache:
  directories:
    - node_modules

# Install dependencies
install:
  - npm ci

# Run tests
script:
  - npm run test
  - npm run build

# Run jobs in parallel
jobs:
  include:
    - stage: lint
      node_js: "16"
      script: npm run lint

    - stage: coverage
      node_js: "16"
      script: npm run test:coverage
# Deploy to npm
deploy:
  provider: npm
  email: "your-npm-email@example.com"
  api_key: $NPM_TOKEN
  on:
    tags: true
    branch: main
# Notifications
notifications:
  email:
    on_success: never
    on_failure: always
  slack:
    rooms:
      - secure: "encrypted-slack-webhook-url"
