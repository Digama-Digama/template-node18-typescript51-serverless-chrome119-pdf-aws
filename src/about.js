import * as handlebars from "handlebars";
import * as config from './config';
import {application} from "./config";
const aboutHtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

    .page-break {
      page-break-before: always;
    }
    .custom-font {
      font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
    }
  </style>
  <body>
    <h1>{{application}}</h1>
    <br/>
    <div>
      <b1>{{aplication}}</b1>
      {{description}}<br/>
      {{version}}
    </div>
    <br/>
    <div>
       por {{desenvolvedor}}
     </div>
    <br /><br />   
  </body>
</html>
`;

const template = handlebars.compile(aboutHtmlTemplate);
const html = template({
    application: config.application,
    description: config.description,
    desenvolvedor: config.developer,
    version: config.version
})
export const about = async () => {
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: html,
    };
};