const report = require('../models/reportdownload');

exports.getExpenses=(req,where)=>{
    return req.user.getExpenses(where);       // where can be user..if u want..it will be more generic way
}

// exports.createDownloadReport=(req,fileUrl)=>{
//     return req.user.createReports({fileUrl:fileUrl});
// }

// exports.getDownloadReport=(req, where)=>{
//     return req.user.getReports({where});
// }