import { ActionError } from './ActionError';
import { Model, Post } from './Model';

let blackSphere = new Model('first', 'BlackSphere');

blackSphere
  .retrieveBuilder()
  .where('status', 'eq', 'true')
  .where('id', 'eq', 1)
  .orWhere('status', 'eq', 'hui')
  .get()
  .then((items: Model | Model[]): void => {
    // render table
    blackSphere.onCreatedEvent('first', 'Post', (entry: Model) => {
      // add row from table
    });
    if (!(items instanceof Model)) {
      items.forEach((item: Model) => {
        item.onUpdatedEvent((entry: Model) => {
          // update sell in table
        });
        item.onDeletedEvent((entry: Model) => {
          // remove row from table
        });
      });
    }
  })
  .catch((error: ActionError) => {
    error.getMessage();
    // open toaster
  });

let post = new Post();

post
  .retrieveBuilder()
  .find(1)
  .then((item: Model): void => {
    // render post
    item.onUpdatedEvent((entity: Model) => {
      // update post info
    });
    item.onDeletedEvent((entity: Model) => {
      // open toster about delete
    });
  })
  .catch((error: ActionError) => {
    // open toster
  });

post
  .retrieveBuilder()
  .addArrayOfOrderBy([
    ['user', 'desc'],
    ['id', 'asc']
  ])
  .paginate(100, 1)
  .then(() => {})
  .catch(() => {});
let postSecond = new Post();
postSecond.fill({
  title: 'Foo Title'
});
postSecond.save();

// In BUS
let postWithBUS = new Post(); // Already exists link to entity in BUS
postWithBUS.sync({
  title: 'Foo Title'
});
