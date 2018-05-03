var superagent = require('superagent');
var config = require('../config/config');
var https = require('https');
var path = require('path');
var fs = require('fs');
var jwt    = require('jsonwebtoken');
var rootPath = path.normalize(__dirname+'/../../');

exports.doGet = function(req, res) {
  if(req.jwtPayload) {
    console.log('Decoded::::', req.jwtPayload);
  }
  var queryString = req.query;
  var backendServer = queryString.backendServer && queryString.backendServer.length > 0 ?
                      queryString.backendServer : 'cdtdevbc';

  var apiUrl = config[backendServer].apiUrl;
  console.log('API URL', apiUrl);
  var certPath = config[backendServer].certPath;
  console.log('Cert path', certPath);
  var cert = fs.readFileSync(certPath);
  var id = req.jwtPayload.body.sub; // config[backendServer].id;
  var pwd = req.jwtPayload.body.permissions; // config[backendServer].pwd;
  console.log('#########', id+' + '+pwd);
  console.log("Query String is ", req.query);

    superagent.get(apiUrl+'/api/rest/get')
    .auth(id,pwd)
    .cert(cert)
    .query(req.query)
    .set('Accept', queryString.accept)
    .set('X-Force-Content-Type', queryString.forceContentType)
    .set('X-Context-geo', queryString.contextGeo)
    .set('X-Context-Group', queryString.contectGroup)
    .set('X-Context-Id', queryString.contextId)
    .end((err, api_res)=> {
      if(err) {
        console.log("Error from API", api_res.status);
        res.send({status: "0", message: 'ET_000', items: []});
      } else {
        console.log("HTTP STATUS CODE = "+api_res.status);
        res.send(api_res.body);
      }
    });


   //res.send(loginResp);

};

exports.doPost = function(req, res) {
  // superagent.post('http://localhost:9080/services/epricer/v2/ibm/api/rest/post')
  // .auth('kiranchowdhury@in.ibm.com','********')
  // .send(req.body)
  // .set('accept','json')
  // .end((err, apiresp)=>{
  //   console.log("Raw Response", apiresp.body);
  //   //console.log("Response from ePricer", JSON.stringify(apiresp.body));
  //   res.send(apiresp.body);
  // });

};

/*
* MOCK DATA SERVICE --- For which back end services are not ready yet
*/

exports.getSavedCriteria = function(req, res) {
  savedCriteria = [{
    id: 'MQ',
    name: 'My Quotes',
    default: true,
    editable: false,
    sequence: 1,
    fetchCount: 300
},
{
    id: 'EQ',
    name: 'Expiring Quotes',
    default: false,
    editable: true,
    sequence: 2,
    fetchCount: 300,
    searchOnName: 'Expired In',
    searchOnValue: 5
}
]
  res.send(savedCriteria);
}
