//Part One:  The Scenario
// Define an asynchronous function named 'assembleUserData'
async function assembleUserData(id) {
  try {
    // Call the 'central' function with the provided id. This returns a Promise
    // that resolves to the name of the database to use. We use 'await' to pause
    // execution of the function until the Promise resolves.
    const dbName = await central(id);

    // Get the database function from the 'dbs' object.
    const db = dbs[dbName];

    // If the database function does not exist, throw an error.
    if (!db) {
      throw new Error(`Database  not found`);
    }

    // Call the database function and the 'vault' function concurrently using
    // 'Promise.all'. This returns a Promise that resolves to an array containing
    // the results of both function calls. We use 'await' to pause execution of
    // the function until the Promise resolves.
    const [basicData, personalData] = await Promise.all([db(id), vault(id)]);

    // Return an object containing the user data. This implicitly returns a
    // Promise that resolves to the user data object, because 'assembleUserData'
    // is an async function.
    return {
      id,
      ...basicData,
      ...personalData,
    };
  } catch (error) {
    // If any of the Promises reject, catch the error and return a rejected
    // Promise with the error message.
    return Promise.reject(error);
  }
}

// Call 'assembleUserData' with an id of 1. This returns a Promise.
assembleUserData(1)
  // Use 'then' to register a callback that will be called when the Promise
  // resolves. The callback logs the user data.
  .then((userData) => console.log(userData))
  // Use 'catch' to register a callback that will be called when the Promise
  // rejects. The callback logs the error.
  .catch((error) => console.error(error));

  
  //Part Two:  The Implementation
  
