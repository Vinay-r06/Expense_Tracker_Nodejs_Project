const AWS=require('aws-sdk');

 exports.uploadToS3=(data,filename)=>{
    const bucket_name='expensestrackers3rahul';
    const iam_User_key="AKIARVN2ZV3N6LZHOGAS";
    const secret_key="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";
    
    
    let s3bucket= new AWS.S3({
      region:'us-east-1',
      accessKeyId:iam_User_key,
      secretAccessKey:secret_key,
    })
    
      var params={
        Bucket:bucket_name,
        Key:filename,
        Body:data,
        ACL: 'public-read'
      }
      return new Promise((resolve, reject)=>{
        s3bucket.upload(params, (err,s3response)=>{            // this is asyncronous task
          if(err){
            console.log('something went wrong', err)
            reject(err)                                       // if it rejects it will go to catch block below code
          }else{
            console.log('success', s3response);
            resolve (s3response.Location)
          }
        })
      })
    }
    