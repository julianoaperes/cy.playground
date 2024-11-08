Preparando diretório com Nodejs, Yarn e cypress para automação

Install a IDE VcCode: https://code.visualstudio.com/download
Instar windowns terminal através da Microsoft store
Instalar o pacot do git para windows: gitforwindows.org
Install Node.js: https://nodejs.org/en (Analisar as versões compatíveis com o projeto)
Criar um diretório com o título do projeto PLAYGROUND. NO caso do windows, criar no drive C devido as limitações de caracteres (249) nos caminhos para os diretorios  
Abra o diretório no terminal, crie um outra pasta, acesse essa pasta,

Instalando npm

type npm init para instalar o gerenciador de pacotes padrão do Node e inicializar um projeto node dentro da pasta. It will create a package.json file. It serves as the project's metadata file and contains important information about the project and its dependencie.
To install cypress use the command npm install cypress. It will create the folder "node_modules" and the "packge-lock.json" file. It is an automatically generated file in a Node.js project, and it plays a crucial role in managing dependencies. It locks the exact versions of every installed package, including their sub-dependencies.
Instal node express framework by typing into the terminal npm i express

Instalando o Yarn

OBS: É possivel utilizar o yarn OU npm sem probelmas com algumas mudanças na syntaxe e estrutura.

yarn init um pacote melhor que o npm init
https://yarnpkg.com/getting-started/install
abra o prompt de commando como administrador e insira o commando: corepack enable. Isso irá ativar o corepack e habilitar o yarn.
feche o terminal e abra novamente
acesse a pasta PLAYGROUND e insira o commando: yarn init -2 ( o '-2' indicará a busca da ultima versão mais estável. Com isso, será criado um repositório git com a branch master dentro da pasta onde foi instalado o yarn.
O Yarn não usa a pasta modules pra gerenciar os pacotes do proheto. Os pacotes ficam instlados no Sistema do node. O cypress ficará instalado dentro do Sistema do node

Instalando cypress através do yarn
digite no terminal: yarn add cypress

Agora temos a pasta PLAYGROUND com um projeto node com yarn e tbm com cypress
Visto que o cypress está instalado dentro do system node por causa do yarn, para outros projetos onde o a versão será a mesma, não será necessário instalar novamente o cypress visto que foi instalado no Sistema node.

Caso necessário instalar outra versão, utilize o commando: yarm add cypress@versãodesejada -D

Instalando o express

Digite no terminal: yarn add express

---

Iniciando com cypress e Yarn

Para abrir o cypress pela primeira vez, abra o terminal e acesse a pasta PLAYGROUD e insira o commando: yarn cypress open

---

Alguns commandos

To start cypress, execute the command "npx cypress open". This command will create the folder "cypress" and the "cypress.config.js" file
To execute the test using the terminal, type "npx cypress run", no UI
To execute the test using the terminal, type "npx cypress run --headed". It will execute all tests with UI
To execute the test using the terminal, type "npx cypress run --spec thelocalfile"
To execute the test using the browser, type "npx cypress run --browser chrome"

---

SUITE DE TESTES: ESTRUTURA INICIAL

Dentro da pasta cypress => e2e (Plano de teste), crie um arquivo "test.cy.js",a suite do seu teste onde serão inputados os códigos dos casos de teste.

describe("Test Description", () => {

it("Test result", () => {
cy.visit("https://playground.cyskills.com.br/login");
});

---

CHECK POINTS

É muito importante analisar a necessidade de uma confirmação de localização. Por exemplo, ao acessar uma página, é preciso que o cypress certifique-se de que está no local correto. Tipo um check point. Para isso, faça:

In Cypress, "checkpoints" can be thought of as assertions or verifications that check if certain conditions are met within your tests. Here are some good ways to add checkpoints to your Cypress tests to ensure that your application is behaving as expected:

1. Basic Assertions
   Use should() or expect() to assert the state of an element or value. Some basic checkpoints include:

Checking Text Content:

javascript
Copy code
cy.get('.welcome-message').should('contain', 'Welcome');
Checking Visibility:

javascript
Copy code
cy.get('.modal').should('be.visible');
Checking if an Element Exists:

javascript
Copy code
cy.get('#username').should('exist');
Checking Value of Input Fields:

javascript
Copy code
cy.get('input[name="email"]').should('have.value', 'user@example.com'); 2. Network Request Checkpoints
Intercept network requests and add assertions on them to verify backend responses.

javascript
Copy code
cy.intercept('GET', '/api/data').as('fetchData');
cy.visit('/data-page');
cy.wait('@fetchData').its('response.statusCode').should('eq', 200);
You can also check the response body, headers, etc., for more detailed verification.

3. URL and Route Assertions
   Verify that the URL is as expected after a navigation event, which is useful for testing if navigation is correct.

javascript
Copy code
cy.url().should('include', '/dashboard');
cy.location('pathname').should('eq', '/dashboard'); 4. State Assertions Using Local Storage or Cookies
Check values in local storage or cookies to verify that expected data is saved.

Local Storage:

javascript
Copy code
cy.window().its('localStorage.token').should('exist');
Cookies:

javascript
Copy code
cy.getCookie('session_id').should('have.property', 'value').and('not.be.empty'); 5. Assertions on CSS Properties
Verify specific CSS properties to check if elements have the correct styling.

javascript
Copy code
cy.get('.button-primary').should('have.css', 'background-color', 'rgb(0, 123, 255)'); 6. Assertions on Element State (Enabled, Disabled, etc.)
Check if elements are in the correct state, such as being enabled or disabled.

javascript
Copy code
cy.get('#submit-button').should('be.disabled'); 7. Table and List Assertions
If you're working with tables or lists, you can verify specific values, row counts, or the presence of specific items.

javascript
Copy code
cy.get('.data-table').find('tr').should('have.length', 5); // Check row count
cy.get('.data-table').contains('td', 'Expected Value'); // Check if a specific value exists 8. Custom Assertions
Create custom assertions using then() for more complex verifications.

javascript
Copy code
cy.get('.price').then(($price) => {
const priceText = $price.text();
expect(parseFloat(priceText)).to.be.gt(0); // Check if price is greater than 0
}); 9. Assertions After Delays or Polling
If you need to wait for a specific condition (like a spinner disappearing), use should() with retries instead of wait().

javascript
Copy code
cy.get('.spinner').should('not.exist'); // Automatically retries until it doesn't exist 10. Visual Assertions (Optional Plugin)
You can add visual checkpoints to compare the current state of the UI to a baseline image using plugins like cypress-image-snapshot.

javascript
Copy code
cy.get('.hero-image').matchImageSnapshot('hero-section');
Putting It All Together
Here’s an example combining a few checkpoints:

javascript
Copy code
cy.visit('/login');
cy.get('#username').type('myUser');
cy.get('#password').type('myPass');
cy.get('#login-button').click();

// Checkpoints after login
cy.url().should('include', '/dashboard');
cy.getCookie('session_id').should('exist');
cy.get('.welcome-message').should('contain', 'Welcome, myUser');
Using these checkpoint types helps ensure that your tests validate all critical parts of your application, giving you confidence that things are working as expected.

---

GANCHOS DO CYPRESS

In Cypress, “ganchos” (hooks in English) are functions that allow you to run specific code at various points in your test's lifecycle. They are essential for setting up the test environment, cleaning up after tests, or executing code before and after individual tests. Cypress hooks are derived from Mocha, a JavaScript testing framework, and they help control the flow of tests, making your test suites more organized and manageable.

The Four Main Cypress Hooks (Ganchos)
before()

Runs once before all tests in a suite.
Commonly used for setting up preconditions, initializing test data, or performing actions that apply to all tests in the suite.
Example use case: Logging into the application or setting up API data before any tests execute.
javascript
Copy code
before(() => {
cy.login(); // Custom command to log in
});
beforeEach()

Runs before each individual test in a suite.
Used for setting up a clean state before each test. This helps ensure that tests don’t interfere with each other.
Example use case: Resetting application state or navigating to a particular page before each test.
javascript
Copy code
beforeEach(() => {
cy.visit('/dashboard'); // Open the dashboard before each test
});
after()

Runs once after all tests in a suite.
Often used to clean up resources, such as deleting data created during tests or logging out from the application.
Example use case: Clearing test data or closing database connections after all tests have run.
javascript
Copy code
after(() => {
cy.clearDatabase(); // Clear test data after all tests complete
});
afterEach()

Runs after each individual test in a suite.
Useful for cleaning up or resetting the application’s state after each test.
Example use case: Clearing cookies or local storage after each test to ensure a clean slate.
javascript
Copy code
afterEach(() => {
cy.clearCookies(); // Clear cookies after each test
});

---

CUSTOM COMMANDS

Custom commands in Cypress are a fantastic way to create reusable, simplified test logic. They allow you to extend Cypress’s API with functions tailored to your application, making tests cleaner and more readable. Instead of repeating similar lines of code across multiple tests, you can create a custom command once and call it whenever needed.

Creating a Custom Command
To create a custom command, you usually add it to the commands.js file in the cypress/support folder. Here’s a basic syntax:

javascript
Copy code
Cypress.Commands.add('commandName', (arg1, arg2) => {
// command logic
})
For example, if your application requires logging in frequently across tests, you could create a login command like this:

javascript
Copy code
Cypress.Commands.add('login', (username, password) => {
cy.visit('/login')
cy.get('input[name="username"]').type(username)
cy.get('input[name="password"]').type(password)
cy.get('button[type="submit"]').click()
})
Now, in your test files, you can call cy.login('myUsername', 'myPassword') instead of repeating all the login steps.

Using Custom Commands
Once defined, custom commands can be called using the cy object, just like built-in Cypress commands. Here’s an example:

javascript
Copy code
describe('My App', () => {
it('should log in and perform some action', () => {
cy.login('user1', 'password123')
cy.get('#welcomeMessage').should('be.visible')
})
})
Adding Assertions to Custom Commands
You can include assertions inside custom commands to verify intermediate states. For example:

javascript
Copy code
Cypress.Commands.add('assertLoggedIn', () => {
cy.get('.user-menu').should('contain', 'Welcome')
})
Custom Commands with Chaining
Cypress custom commands can return elements and be chained with other commands. For instance:

javascript
Copy code
Cypress.Commands.add('selectMenuOption', (menuText) => {
return cy.get('.menu-item').contains(menuText).click()
})
Now, you can chain other Cypress commands after selectMenuOption.

Overwriting Cypress Commands
You can also overwrite built-in Cypress commands for custom behavior. For example, if you want to modify how cy.visit() works, you could do this:

javascript
Copy code
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
// Modify the URL or options
return originalFn(url, options)
})
Tips for Using Custom Commands
Keep them focused: Each custom command should ideally perform one clear action to keep it reusable.
Modularize: Organize commands by feature or functionality for easier maintenance.
Add Comments: Especially if commands have more complex logic, comments help future-proof the code.
Using custom commands can significantly streamline tests, especially if you find yourself writing similar code across multiple test cases.

Configurando ROUTE em uma custom command

"Route" precisa passer por uma interpolação e string gerando o localizador. Para isso, usa-se o apostofre (``) no lugar das aspas e ${route}.

Cypress.Command.add("menuAcessAndConfirmation", (route, title) => {
cy.get(`nav a[href="${route}"]`).click();
cy.contains("h2", titel).should("be.visible");
});

the variable route is indeed being interpolated into the string. In JavaScript, string interpolation is a technique that allows you to insert variables or expressions directly into a string dynamically by using backticks (`) instead of single (') or double (") quotes.

This syntax is called a template literal, and it lets you place variables within ${}. In this case, the value of the route variable will be inserted into the string nav a[href="${route}"].

---

MANIPULANDO ELEMENTOS E CRIANDO LOCALIZADORES

Identificar o element html

A ideia é encontrar um element e criar um localizador de forma que seja único.
Para consultar a quantidade existente desse element, acesse a ferramenta de inspeção do windowns de forma a inspecionar o ponto de teste, clique na aba elementos, pressione ctrl f para localizer. então, identifique a sintaxe para do element para utilizer Nessa busca.
Elemento <a>
Em HTML <a> é um link que contém a propriedade "href", uma referência de destino a ação do clique no link que normalmente apresenta um valor único.  

Para localizer o elemento use:

    				 sintaxe: ('a[href="/rotadolink"]')

Analise o resultado da busca e, se for 1 utilize o este como localizador. Caso contrário, pode ser um bug porque o link deveria ser único. Agora, encontre outro elemento.
Para isso, vasculhe os elementos da arvore a qual esse primeiro elemento pertence. Uma próxima boa opção seria encontrar a tag <nav> used to define a block of navigation links on a webpage. Selecionar o elemento a partir de um bloco facilita muito sua unicidade. Seria como encontrar uma cidade em um país, caso seu nome se repita em outras regiões. Poderíamos pensar em localizá-la pelo CEP. Essa seria uma boa opçao, não?

Para isso, caso tenha encontrado o bloco da tag <nav>, basta utilizer seguinte sintaxe:

    				sintaxe: ('nav a[href="/rotadolink"]')

Elemento <input>

The <input> tag in HTML is used to create interactive form controls for accepting data from the user. It’s a self-closing tag (meaning it doesn't need an ending tag), and it comes with various attributes that define its behavior, appearance, and the type of data it collects. The <input> tag is versatile because you can use it to create different input types, such as text fields, checkboxes, radio buttons, and more.

Common Attributes
Some commonly used attributes with <input> are:

type: Specifies the type of input, such as text, password, email, number, checkbox, etc.
name: Sets a unique name for the form data to be submitted.
id: Gives a unique identifier, which is useful for styling with CSS or accessing via JavaScript.
placeholder: Provides hint text for what the user should enter.
value: Sets a default value.
required: Ensures the field must be filled out before submitting.
disabled: Makes the field uneditable.
Example Usages
Here are a few examples with different input types:

Text Input:

html
Copy code
<input type="text" name="username" placeholder="Enter your username">
Password Input:

html
Copy code
<input type="password" name="password" placeholder="Enter your password">
Checkbox:

html
Copy code
<input type="checkbox" name="newsletter" value="subscribe"> Subscribe to newsletter
Radio Button:

html
Copy code
<input type="radio" name="gender" value="male"> Male
<input type="radio" name="gender" value="female"> Female
Email Input:

html
Copy code
<input type="email" name="email" placeholder="Enter your email">
Each type attribute changes how the <input> behaves, allowing developers to collect the right kind of data easily.

The <input> element is part of the form elements in HTML, allowing users to interact with the page by entering information, selecting options, or submitting data. When working with Cypress or other testing tools, you interact with <input> as a DOM element, using selectors to identify it and access its attributes or change its values.

For example, you might use Cypress to select an <input> element like this:

    		sintaxe:cy.get('nav a[href="/input-fields"]').click();
    			cy.get("#fullname").type("Juliano Peres");
    				cy.get('input[type="email"]').type("juliano.a.peres@gmail.com");

cy.get('input[type="number"]').type("1234567890");
cy.get('input[type="date"]').type("1986-03-17");

---

Textarea Element

The <textarea> tag in HTML is used to create a multi-line text input field. Unlike the <input> tag with type="text", which is limited to a single line, <textarea> allows users to enter larger amounts of text, such as comments, messages, or descriptions.

Key Characteristics
Multi-line input: Unlike <input type="text">, <textarea> provides a flexible, resizable box for multiple lines.
Closing tag required: <textarea> needs an opening and a closing tag, so any default text can go inside it.
Example Usage
Here's a simple example:

html
Copy code
<textarea name="comments" rows="4" cols="50" placeholder="Enter your comments here..."></textarea>
Common Attributes
name: Sets a unique name for the field when submitting a form.
rows: Defines the number of visible text lines.
cols: Sets the visible width (number of character columns) of the text area.
placeholder: Provides hint text that appears when the text area is empty.
maxlength: Limits the number of characters that can be entered.
readonly: Makes the field uneditable but allows users to copy text from it.
disabled: Prevents users from interacting with it.
Example with Default Text
html
Copy code
<textarea name="description" rows="5" cols="60">Default text in the textarea</textarea>
Interacting with <textarea> in Cypress
To type or verify text in a <textarea> using Cypress:

SINTAX

// Typing into a textarea
cy.get('textarea[name="comments"]').type('This is a sample comment.');

// Verifying the text inside a textarea
cy.get('textarea[name="comments"]').should('have.value', 'This is a sample comment.');
The <textarea> tag is perfect for situations where users need to enter larger bodies of text, providing a comfortable space for multi-line input.

---

CHECKBOXES

Caso esteja oculto:

cy.get('label[for="javascript"]').click();

Caso preciser forçar

    cy.get('input'="value="1"").click(force:true)

Caso esteja visível e não precise forçar

    cy.get('input'="value="1"").click()

Caso tenha inumeras opções de checkboxes, use "const langs"

In JavaScript, const langs is typically used to declare a constant variable named langs. This variable is often used to hold data, such as an array or an object representing a set of languages or language-related data.

For example:

An Array of Language Names:

javascript
Copy code
const langs = ["JavaScript", "Python", "Ruby", "Java", "C++"];
Here, langs is a constant array containing a list of programming languages.

An Object with Language Codes and Names:

javascript
Copy code
const langs = {
en: "English",
es: "Spanish",
fr: "French",
de: "German",
jp: "Japanese"
};
In this case, langs is an object where the keys are language codes (e.g., en, es) and the values are the language names.

An Array of Objects for Languages with More Details:

javascript
Copy code
const langs = [
{ code: "en", name: "English", nativeName: "English" },
{ code: "es", name: "Spanish", nativeName: "Español" },
{ code: "fr", name: "French", nativeName: "Français" }
];
Here, langs is an array of objects, where each object represents a language with properties like code, name, and nativeName.

The code:

it("Clicking on all checkboxes by looping", () => {
const langs = ["javascript", "python", "rust", "go", "typescript"];
langs.forEach((lang) => {
cy.get(`label[for="${lang}"]`).click();
});
});

This code is a test written in Cypress, a JavaScript-based testing framework, and it's designed to click on a set of checkboxes by looping through them.

Here’s a breakdown of each part of the code:

Code Explanation
Test Definition:

javascript
Copy code
it("Clicking on all checkboxes by looping", () => {
it(...) is a function provided by Cypress (and other testing frameworks like Mocha) that defines an individual test case.
"Clicking on all checkboxes by looping" is the description of this test, explaining what the test does.
The arrow function () => { ... } contains the actual code for this test.
Constant Array Declaration:

javascript
Copy code
const langs = ["javascript", "python", "rust", "go", "typescript"];
const langs is a constant array that holds a list of strings representing programming languages.
These strings are likely the IDs or unique identifiers for checkboxes in the DOM (Document Object Model), where each language has an associated checkbox.
Looping Through Each Language:

javascript
Copy code
langs.forEach((lang) => {
langs.forEach(...) is a method that iterates over each element in the langs array.
For each iteration, the current language in the array (e.g., "javascript", "python", etc.) is passed as the lang variable.
Clicking on the Checkbox for Each Language:

javascript
Copy code
cy.get(`label[for="${lang}"]`).click();
cy.get(...) is a Cypress command used to select an element from the DOM.
In this case, it’s selecting a <label> element with a for attribute matching the current language (e.g., for="javascript").
The backticks (`) are used for template literals in JavaScript, allowing you to insert the variable lang directly into the string.
.click() is a Cypress command that simulates a click action on the selected element, which in this case is the label associated with each checkbox.

---

CLASSES

    Classes de estilização não sao boas para uso em automação

---
