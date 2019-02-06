const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });


export function hello(event, context, callback) {
  const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
  const params = {
    TableName: 'buffalo_meetings',

    KeyConditionExpression: 'assigned_to = :user_id',
    FilterExpression: 'due_date_epoch = :today_epoch OR due_date_epoch = :no_epoch',
    ScanIndexForward: true,
    ExpressionAttributeValues: {
      ':user_id': { S: event.user_id },
      ':today_epoch': { S: event.today_epoch },
      ':no_epoch': { S: 'none' }
    },
    IndexName: "id-index"

  };

  ddb.query(params, (err, data) => {
    console.log('data', data);
    if (err) {
      context.fail(new Error('Unrecognized operation "' + err + '"'));
    } else {
      console.log(data.Items)
      const returnItems = data.Items;
      returnItems.map((returnItem) => {
        returnItem.completed = returnItem.completed.BOOL;
        returnItem.short_description = returnItem.short_description.S;
        returnItem.due_date_epoch = returnItem.due_date_epoch.S;
        returnItem.description = returnItem.description.S;
        returnItem.id = returnItem.id.S;
        returnItem.assigned_to = returnItem.assigned_to.S;
        returnItem.title = returnItem.title.S;
      });
      console.log(returnItems);
      returnItems.sort(compare);
      callback(null, {
        message: returnItems,
        event
      });;
    }
  });
};

const compare = (a, b) => {
  if (a.created_on < b.created_on)
    return -1;
  if (a.created_on > b.created_on)
    return 1;
  return 0;
}

