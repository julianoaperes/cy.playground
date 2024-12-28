
Testing these elements in Cypress using Yarn and JavaScript involves leveraging Cypress's intuitive API and possibly installing additional plugins for certain functionalities (like handling iframes or drag-and-drop actions). Here's a breakdown of how you can test each element:

1. Testing Checkboxes
describe('Checkbox Test', () => {
  it('should check and uncheck a checkbox', () => {
    cy.visit('/your-page');
    cy.get('input[type="checkbox"]').check(); // Check the checkbox
    cy.get('input[type="checkbox"]').should('be.checked');
    cy.get('input[type="checkbox"]').uncheck(); // Uncheck the checkbox
    cy.get('input[type="checkbox"]').should('not.be.checked');
  });
});

2. Testing Drag and Drop
Cypress doesn’t have native support for drag-and-drop, so you’ll need a plugin like @4tw/cypress-drag-drop.

Install the Plugin:
yarn add @4tw/cypress-drag-drop
Include in Cypress:
In cypress/support/commands.js:
import '@4tw/cypress-drag-drop';
describe('Drag and Drop Test', () => {
  it('should drag and drop an element', () => {
    cy.visit('/your-page');
    cy.get('#draggable').drag('#droppable');
    cy.get('#droppable').should('contain', 'Dropped!');
  });
});

3. Testing Iframes
Install the cypress-iframe plugin for handling iframes.
yarn add cypress-iframe
Include in Cypress:
In cypress/support/commands.js:
import 'cypress-iframe';
describe('Iframe Test', () => {
  it('should interact with elements inside an iframe', () => {
    cy.visit('/your-page');
    cy.frameLoaded('#iframeId'); // Load the iframe
    cy.iframe().find('button').click(); // Interact with iframe content
    cy.iframe().find('#result').should('contain', 'Success');
  });
});

4. Testing Text Area
describe('Text Area Test', () => {
  it('should type into a text area', () => {
    cy.visit('/your-page');
    cy.get('textarea').type('This is a test');
    cy.get('textarea').should('have.value', 'This is a test');
  });
});

5. Testing Radio Buttons
describe('Radio Button Test', () => {
  it('should select a radio button', () => {
    cy.visit('/your-page');
    cy.get('input[type="radio"][value="option1"]').check();
    cy.get('input[type="radio"][value="option1"]').should('be.checked');
  });
});

6. Testing Selects (Dropdowns)
describe('Select Dropdown Test', () => {
  it('should select an option from a dropdown', () => {
    cy.visit('/your-page');
    cy.get('select').select('Option 2'); // Select by visible text
    cy.get('select').should('have.value', 'option2'); // Verify value
  });
});

7. Testing File Upload
Install the cypress-file-upload plugin for handling file uploads.
yarn add cypress-file-upload
Include in Cypress:
In cypress/support/commands.js:
import 'cypress-file-upload';
describe('File Upload Test', () => {
  it('should upload a file', () => {
    cy.visit('/your-page');
    const fileName = 'example.pdf';
    cy.get('input[type="file"]').attachFile(fileName);
    cy.get('#uploadStatus').should('contain', 'Upload successful');
  });
});
Add the File to Fixtures:
Place your example.pdf in the cypress/fixtures directory.
General Tips
Ensure Dependencies: Use yarn to manage dependencies efficiently.
yarn add cypress
Test Structure: Organize your tests under cypress/integration for clarity.
Run Tests: Use the Cypress Test Runner.
yarn run cypress open
Custom Commands: Define reusable commands in cypress/support/commands.js.


GANCHOS DO CYPRESS

In Cypress, hooks are special methods used to organize and manage test setup, teardown, and other repetitive tasks. These hooks come from the Mocha testing framework, which Cypress is built on. Hooks make tests more efficient and reduce redundancy.

Types of Hooks in Cypress
1. before()
Runs once before all tests in a test suite (describe block).
Use it to set up a global state or initialize resources.
Example:
describe('Test Suite with before()', () => {
  before(() => {
    cy.log('Runs once before all tests');
    cy.visit('/login');
    cy.get('#username').type('admin');
    cy.get('#password').type('password123');
    cy.get('#loginButton').click();
  });

  it('Test 1', () => {
    cy.url().should('include', '/dashboard');
  });

  it('Test 2', () => {
    cy.contains('Welcome').should('exist');
  });
});

2. beforeEach()
Runs before each test in a test suite.
Use it for repetitive setup tasks, like navigating to a page or resetting state.
Example:
describe('Test Suite with beforeEach()', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('Test 1', () => {
    cy.contains('Dashboard').should('exist');
  });

  it('Test 2', () => {
    cy.get('#logoutButton').should('be.visible');
  });
});

3. after()
Runs once after all tests in a test suite.
Use it for cleanup tasks, like resetting the environment or logging out.
Example:
describe('Test Suite with after()', () => {
  after(() => {
    cy.log('Runs once after all tests');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Test 1', () => {
    cy.url().should('include', '/dashboard');
  });

  it('Test 2', () => {
    cy.contains('Welcome').should('exist');
  });
});

4. afterEach()
Runs after each test in a test suite.
Use it for cleanup tasks that need to happen after every test, like clearing test data or resetting states.
Example:
describe('Test Suite with afterEach()', () => {
  afterEach(() => {
    cy.log('Runs after each test');
    cy.clearCookies();
  });

  it('Test 1', () => {
    cy.url().should('include', '/dashboard');
  });

  it('Test 2', () => {
    cy.contains('Welcome').should('exist');
  });
});
When to Use Each Hook
before: For one-time setup tasks that apply to all tests.
beforeEach: For repetitive setup tasks that are needed for each test.
after: For one-time cleanup tasks after all tests run.
afterEach: For repetitive cleanup tasks after each test.
Best Practices with Hooks
Avoid Overloading Hooks: Keep them concise to ensure readability.
Use beforeEach for State Isolation: Reset states or navigate to the base state for each test.
Log Actions: Use cy.log() to debug and track execution in hooks.
Leverage Custom Commands: Combine hooks with reusable commands in cypress/support/commands.js.
Combined Example
describe('Hooks Demo', () => {
  before(() => {
    cy.log('Global setup: Runs once before all tests');
    cy.visit('/login');
  });

  beforeEach(() => {
    cy.log('Test setup: Runs before each test');
    cy.login('user', 'password'); // Custom command
  });

  afterEach(() => {
    cy.log('Test teardown: Runs after each test');
    cy.clearCookies();
  });

  after(() => {
    cy.log('Global cleanup: Runs once after all tests');
    cy.clearLocalStorage();
  });

  it('Test 1: Dashboard accessibility', () => {
    cy.contains('Dashboard').should('exist');
  });

  it('Test 2: Profile accessibility', () => {
    cy.visit('/profile');
    cy.contains('Profile').should('exist');
  });
});

CUSTOM COMMANDS

Custom commands in Cypress are reusable methods that you define to simplify repetitive actions or encapsulate complex operations. They help keep your test code DRY (Don't Repeat Yourself) and make your tests more readable and maintainable.

How to Create Custom Commands
Locate the commands.js File

Cypress provides a default file: cypress/support/commands.js.
You define your custom commands here.
Define a Command

Use Cypress.Commands.add() to create a new command.
Syntax:

Cypress.Commands.add('commandName', (param1, param2) => {
  // Command implementation
});
Examples of Custom Commands
1. Login Command
A common use case for a custom command is automating the login process.
// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#loginButton').click();
});

// Usage in a test
describe('Login Test', () => {
  it('logs in successfully', () => {
    cy.login('admin', 'password123');
    cy.url().should('include', '/dashboard');
  });
});

2. Select a Dropdown Option
Simplify dropdown interactions.

Cypress.Commands.add('selectDropdown', (selector, option) => {
  cy.get(selector).select(option);
});
// Usage in a test
describe('Dropdown Test', () => {
  it('selects an option', () => {
    cy.visit('/form');
    cy.selectDropdown('#dropdown', 'Option 2');
    cy.get('#dropdown').should('have.value', 'option2');
  });
});

3. Drag and Drop
Encapsulate drag-and-drop functionality (requires a plugin).

import '@4tw/cypress-drag-drop';

Cypress.Commands.add('dragAndDrop', (source, target) => {
  cy.get(source).drag(target);
});

// Usage in a test
describe('Drag and Drop Test', () => {
  it('drags an element', () => {
    cy.visit('/drag-and-drop');
    cy.dragAndDrop('#item', '#dropZone');
    cy.get('#dropZone').should('contain', 'Dropped!');
  });
});

4. Custom Assertions
Create a command to verify common assertions.
Cypress.Commands.add('assertText', (selector, text) => {
  cy.get(selector).should('have.text', text);
});

// Usage in a test
describe('Text Assertion Test', () => {
  it('verifies the text', () => {
    cy.visit('/page');
    cy.assertText('#message', 'Success');
  });
});

5. File Upload
Encapsulate file upload (requires the cypress-file-upload plugin).
import 'cypress-file-upload';
Cypress.Commands.add('uploadFile', (selector, fileName) => {
  cy.get(selector).attachFile(fileName);
});

// Usage in a test
describe('File Upload Test', () => {
  it('uploads a file', () => {
    cy.visit('/upload');
    cy.uploadFile('input[type="file"]', 'example.pdf');
    cy.get('#status').should('contain', 'Upload successful');
  });
});
Organizing Custom Commands
If you have many commands, consider splitting them into multiple files for better organization:

Create a folder, e.g., cypress/support/commands/.
Create separate files, e.g., authCommands.js, formCommands.js.
Import them in cypress/support/commands.js:
import './commands/authCommands';
import './commands/formCommands';
Best Practices
Name Commands Descriptively: Ensure the command name reflects its functionality.
Parameterize Commands: Accept arguments to make commands flexible.
Log Actions: Use cy.log() within commands to make debugging easier.
Test Commands Independently: Ensure the commands themselves are reliable before using them in multiple tests.
Example: Combined Custom Commands
// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#loginButton').click();
});

Cypress.Commands.add('fillForm', (formData) => {
  cy.get('#name').type(formData.name);
  cy.get('#email').type(formData.email);
  cy.get('#password').type(formData.password);
  cy.get('#submitButton').click();
});

// Usage in tests
describe('Combined Commands Test', () => {
  it('logs in and fills a form', () => {
    cy.login('admin', 'password123');
    cy.url().should('include', '/dashboard');

    cy.fillForm({ name: 'John Doe', email: 'john@example.com', password: 'securePass' });
    cy.get('#confirmation').should('contain', 'Form submitted successfully');
  });
});

Testing a CEP (Postal Code) field in Cypress involves validating user interactions and behaviors, such as correct formatting, validation messages for invalid inputs, auto-filling address fields after entering a valid CEP, or preventing the form submission with incorrect data.

1. Validate Field Formatting
Ensure that the field accepts only numbers or follows a specific pattern (e.g., #####-###).
describe('CEP Field - Format Validation', () => {
  it('should allow only numbers or valid CEP format', () => {
    cy.visit('/your-page');
    
    // Attempt entering letters
    cy.get('#cepField').type('abcde').should('have.value', '');

    // Enter a valid CEP format
    cy.get('#cepField').type('12345-678').should('have.value', '12345-678');
  });
});

2. Test Required Field Validation
Ensure that the form prevents submission if the CEP field is empty.
describe('CEP Field - Required Validation', () => {
  it('should show an error when the CEP field is empty', () => {
    cy.visit('/your-page');
    cy.get('#submitButton').click(); // Submit without filling
    cy.get('#cepError').should('contain', 'CEP is required');
  });
});

3. Test Invalid CEP Validation
Ensure the form shows an error for invalid CEP inputs.
describe('CEP Field - Invalid Input', () => {
  it('should show an error for an invalid CEP', () => {
    cy.visit('/your-page');
    cy.get('#cepField').type('12345'); // Incomplete CEP
    cy.get('#submitButton').click();
    cy.get('#cepError').should('contain', 'Invalid CEP');
  });
});

4. Test Auto-Fill Address After Valid CEP
If your application fetches address details (e.g., via an API like ViaCEP), you can mock the API response and validate the auto-fill behavior.

Mocking API Response:
describe('CEP Field - Auto-Fill Address', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://viacep.com.br/ws/12345678/json/', {
      statusCode: 200,
      body: {
        cep: '12345-678',
        logradouro: 'Rua Exemplo',
        bairro: 'Centro',
        localidade: 'São Paulo',
        uf: 'SP'
      },
    }).as('getAddress');
  });

  it('should auto-fill address fields after entering a valid CEP', () => {
    cy.visit('/your-page');
    cy.get('#cepField').type('12345-678');
    cy.wait('@getAddress');
    
    // Check if address fields are filled
    cy.get('#streetField').should('have.value', 'Rua Exemplo');
    cy.get('#neighborhoodField').should('have.value', 'Centro');
    cy.get('#cityField').should('have.value', 'São Paulo');
    cy.get('#stateField').should('have.value', 'SP');
  });
});

5. Prevent Submission with Invalid Data
Ensure that the form does not proceed if an invalid or incomplete CEP is entered.
describe('CEP Field - Prevent Invalid Submission', () => {
  it('should prevent form submission with an invalid CEP', () => {
    cy.visit('/your-page');
    cy.get('#cepField').type('12345'); // Incomplete CEP
    cy.get('#submitButton').click();
    cy.url().should('include', '/your-page'); // Ensure it doesn't navigate
    cy.get('#cepError').should('contain', 'Invalid CEP');
  });
});

6. Test Edge Cases
Handle situations such as:
Entering a valid CEP but receiving an error from the API (e.g., server error or CEP not found).
Inputting a CEP with extra spaces or special characters.
Example:
describe('CEP Field - Edge Cases', () => {
  it('should trim spaces and accept valid CEP', () => {
    cy.visit('/your-page');
    cy.get('#cepField').type(' 12345-678 ');
    cy.get('#cepField').should('have.value', '12345-678');
  });

  it('should show an error if the API fails', () => {
    cy.intercept('GET', 'https://viacep.com.br/ws/12345678/json/', {
      statusCode: 500,
    }).as('getAddress');

    cy.visit('/your-page');
    cy.get('#cepField').type('12345-678');
    cy.wait('@getAddress');
    cy.get('#cepError').should('contain', 'Failed to fetch address');
  });
});

7. Combine with Other Fields
Test how the CEP field interacts with other form elements, such as ensuring dependent fields are cleared when the CEP is changed.

describe('CEP Field - Clear Dependent Fields', () => {
  it('should clear auto-filled fields when CEP is changed', () => {
    cy.visit('/your-page');
    cy.get('#cepField').type('12345-678');
    cy.get('#streetField').should('have.value', 'Rua Exemplo');
    
    // Change the CEP
    cy.get('#cepField').clear().type('98765-432');
    cy.get('#streetField').should('have.value', '');
  });
});



