const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();
const testFolder = './uploads/';
const fs = require('fs');

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/files', async (req,res) => {
    let files = [];
    fs.readdirSync(testFolder).forEach(file => {
        files.push(file);
        console.log(file);
    });
    res.send(files);
});

app.get('/getfile', (req, res) => {
    console.log(req.query.file);
    let filePath = './uploads/' + req.query.file
    res.download(filePath)

});

app.post('/uploadfile', async (req, res) => {
    //console.log(req.files)
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            let file = req.files.file;

            file.mv('./uploads/' + file.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 3000;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);
