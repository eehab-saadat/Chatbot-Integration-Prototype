# Prototype Documentation

This is a very basic preliminary prototype designed only for integration testing as was discussed in the latest meeting. The testing procedure has been divided into three phases, which includes the setup and testing criteria.

## 1. Setup & Installation

Inorder to use this prototype, you must ensure that following pre-requisites are satisfied:

1. **Clone the repository**. Clone the following repository onto your system using git, assuming you're already familiar with it:
```sh
git clone https://github.com/eehab-saadat/Chatbot-Integration-Prototype
```
and then change directory into the clone directory after installation using 
```sh
cd Chatbot-Integration-Prototype
```

2. **Install Python**. If you have Python already installed, you may skip this step, else you may install it [here](https://www.python.org/downloads/). You may check if your installation has been successfull by running the following command in shell:
```sh
python3 --version
```

3. **Create and activate a virtual environment**. Once you have successfully installed Python. Create a virtual environment using the following command:
```sh
python3 -m venv venv
```
If you are operating on linux, you can activate the virtual environement using:
```sh
source venv/bin/activate
```
On windows, you may activate it using:
```sh
.\venv\Scripts\activate
```
After activation, the shell may show **(venv)** on it, indicating successfull activation.

4. **Install dependencies**. Run the following command to install all the required dependencies:
```sh
pip install -r requirements.txt
```

## 2. Usage & Testing

The `demo` folder contains testing files. The `createIframe()` function implmented inside the `demo/createIframe.js` is the entry point for the chatbot component, which effectively implements code abstraction between the user and chatbot and simplifies the component usage and integration. 

The function signature of the `createIframe()` function is following:

```js
function createIframe(question = "", email = "", source = "http://127.0.0.1:5000")
```
which takes in three parameters: question (string), email (string) and source (string). The default server is set at `http://127.0.0.1:5000`, and a function call with no parameters would set the default email to `guest` and default question to `You are a leader because...`, and can be altered by passing in parameters, accordingly.

The function returns a `HTMLFrameElement` that is the iframe constructed with defined properties, which can then be appended as a child to any parent element. 

For example,

```js
const question = "What is the meaning of life?";
const email = "johndoe@example.com";
const elem = document.getElementById("custom-element");
const iframe = createIframe(question, email);
if (elem) {
    elem.appendChild(iframe);
}
```

or 

```js
const iframe = createIframe();
if (elem) {
    document.body.appendChild(iframe);
}
```
and etc.

**NOTE:** You need to have the Flask server running before accessing the localhost server. You can do that by running the following command in the project directory:

```sh
flask run --debug
```
which when run would display the following, indicating the server is running:
```
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 934-873-651
```
After this server is running, you may either use the `createIframe()` function in the application you wish to integrate with or if you want to see a demo first, you may double click `demo/testing.html` to see a live demo. 

