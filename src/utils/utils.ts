import localforage from 'localforage';

export const defaultHtmlValue = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>

  <body>
      <h1>Hi there</h1>
  </body>
</html>
`;

export const readFromIndeDB = async () => {
  try {
    const value: string | null = await localforage.getItem('htmlContent');
    if (!value) {
      return defaultHtmlValue;
    } else {
      return value;
    }
  } catch (err) {
    // This code runs if there were any errors.
    console.log(err);
  }
};

export const writeToIndexDB = async (key: string, value: string) => {
  try {
    await localforage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};
