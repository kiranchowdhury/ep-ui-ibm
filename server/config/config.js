var path = require("path");
var rootPath = path.normalize(__dirname+'/../../');
module.exports = {
    il4174 : {
        rootPath: rootPath,
        apiUrl:'https://inmbzp4174.in.dst.ibm.com/services/epricer/v2/ibm',
        certPath: rootPath+'certs/IL4174.crt',
        secret: '46443c94-16f3-400d-98cb-b46547193155'
    },
    il1109 : {
      rootPath: rootPath,
      apiUrl:'https://inmbz1109.in.dst.ibm.com/services/epricer/v2/ibm',
      certPath: rootPath+'certs/IL1109.crt',
      secret: '46443c94-16f3-400d-98cb-b46547193155'
  },
  il4113 : {
    rootPath: rootPath,
    apiUrl:'https://inmbzp4113.in.dst.ibm.com/services/epricer/v2/ibm',
    certPath: rootPath+'certs/IL4113.crt',
    secret: '46443c94-16f3-400d-98cb-b46547193155'
  },
  cdtdevbc : {
    rootPath: rootPath,
    apiUrl:'https://w3alpha-2.toronto.ca.ibm.com/services/epricer/v2/ibm',
    certPath: rootPath+'certs/cdtdevbc.crt',
    secret: 'de2dfc11-769a-4a06-a1eb-6393e4836838'
  },
  cdtdevdir : {
    rootPath: rootPath,
    apiUrl:'https://mkmpgzcl2124.toronto.ca.ibm.com/services/epricer/v2/ibm',
    certPath: rootPath+'certs/cdtdevdir.crt',
    secret: 'de2dfc11-769a-4a06-a1eb-6393e4836838'
  },
  cdtmaint : {
    rootPath: rootPath,
    apiUrl:'https://w3beta-2.toronto.ca.ibm.com/services/epricer/v2/ibm/',
    certPath: rootPath+'certs/cdtmain.crt',
    secret: 'de2dfc11-769a-4a06-a1eb-6393e4836838'
  }
  // production : {
  //       rootPath: rootPath,
  //       apiUrl:'https://wwwalpha-2.toronto.ca.ibm.com/services/partners/epricer/v2',
  //       port:process.env.PORT || 80,
  //       host:process.env.IP
  //   }
};
