import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

process.env.PWD = process.cwd()
app.use( cors({origin: '*'}) )
app.use( express.json() )
app.use( express.urlencoded({ extended: true }))
app.use("/",express.static(process.cwd() + "/blackthorn-ui") )

/* logging */
app.use( 
    (request: Request, response: Response, next:NextFunction ) => {
        console.log(`${request.method} ${request.path}`)
        next()
    }
)

app.listen(port);  
       
console.log('Running server at http://localhost:' + port + '/');
 
exports = module.exports = app;   
