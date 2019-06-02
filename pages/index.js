import { GraphQLClient } from 'graphql-request';

function Index({ items }) {

  return (
    <main>
      <ul>
        {items.map((item, index) => <li key={index}>{item.name}</li>)}
      </ul>
    </main>
    );
}

Index.getInitialProps = async function () {

  const query = `{
    items {
      name
    }
  }`;

  const endpoint = process.env.GRAPHQL_URL || 'http://127.0.0.1/v1/graphql';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'x-hasura-admin-secret': process.env.GRAPHQL_SECRET || null,
    },
  })

  const { items } = await graphQLClient.request(query);

  return {
    items: items || []
  };

};

export default Index;
