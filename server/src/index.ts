import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

process.env.PWD = process.cwd()
app.use( cors({origin: '*'}) )
app.use( express.json() )
app.use( express.urlencoded({ extended: true }))

/* logging */
app.use( 
    (request: Request, response: Response, next:NextFunction ) => {
        console.log(`${request.method} ${request.path}`)
        next()
    }
)

app.use("/",express.static(process.cwd() + "/blackthorn-ui") )
app.use("*", 
    (request: Request, response: Response, next:NextFunction ) => {
        response.sendFile(process.cwd() + "/blackthorn-ui/index.html");
    }
)



app.listen(port);  
       
console.log('Running server at http://localhost:' + port + '/');
 
exports = module.exports = app;   
