// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision').v1;

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// Bucket where the file resides
 const bucketName = 'ml_poc';
// Path to PDF file within bucket
 const fileName = '2002763_STP.TIF';

const gcsSourceUri = `gs://${bucketName}/${fileName}`;
const gcsDestinationUri = `gs://${bucketName}/${fileName}.json`;
// const gcsDestinationUri =`/home/vijo/Music/nodeJS/ML POC/${fileName}.json`;
const inputConfig = {
  // Supported mime_types are: 'application/pdf' and 'image/tiff'
  mimeType: 'image/tiff',
  gcsSource: {
    uri: gcsSourceUri,
  },
};
const outputConfig = {
  gcsDestination: {
    uri: gcsDestinationUri,
  },
};
const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
const request = {
  requests: [
    {
      inputConfig: inputConfig,
      features: features,
      outputConfig: outputConfig,
    },
  ],
};

client
  .asyncBatchAnnotateFiles(request)
  .then(results => {
    const operation = results[0];
    // Get a Promise representation of the final result of the job
    return operation.promise();
  })
  .then(filesResponse => {
    const destinationUri =
      filesResponse[0].responses[0].outputConfig.gcsDestination.uri;
    console.log('Json saved to: ' + destinationUri);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
