
import { Client, logger , Variables} from "camunda-external-task-client-js";


// configuration for the client
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

// create a new client instance
const client = new Client(config);

// subscribe to the "updateQuantity" topic
client.subscribe('BOTCreateNewProductCode', async function ({ task, taskService }) {
    // get the quantity value from the task payload

    const generateRandomString = (length) => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            if (i < 2) {
                result += letters.charAt(Math.floor(Math.random() * letters.length));
            } else {
                result += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
        }
        return result;
    }

    const randomString = generateRandomString(7);    

    const processVariables = new Variables();
    processVariables.set("quantity", 1);
    processVariables.set("code", randomString);

    // complete the task and set the process variables
    await taskService.complete(task, processVariables);   
    
});