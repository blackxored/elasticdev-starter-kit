// @flow
import faunadb, { query as q } from 'faunadb';

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
});

export function findAll(indexName: string) {
  return faunaClient.query(
    q.Select(
      'data',
      q.Map(q.Paginate(q.Match(q.Index(indexName))), row =>
        q.Select('data', q.Get(row)),
      ),
    ),
  );
}

export function findById(indexName: string, id: string) {
  return faunaClient.query(
    q.Select('data', q.Get(q.Match(q.Index(indexName), id))),
  );
}

export default {
  findAll,
  findById,
};
