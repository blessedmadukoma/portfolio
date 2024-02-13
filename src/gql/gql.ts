/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query FetchAllPosts {\n  user(username: \"mblessed\") {\n    publications(first: 1) {\n      edges {\n        node {\n          posts(first: 0) {\n            edges {\n              node {\n                id\n                title\n                slug\n                subtitle\n                tags {\n                  id\n                  name\n                }\n                url\n                coverImage {\n                  url\n                }\n                readTimeInMinutes\n                publishedAt\n                brief\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.FetchAllPostsDocument,
    "query FetchPostById($slug: String!) {\n  user(username: \"mblessed\") {\n    publications(first: 1) {\n      edges {\n        node {\n          post(slug: $slug) {\n            id\n            title\n            slug\n            subtitle\n            tags {\n              id\n              name\n            }\n            url\n            coverImage {\n              url\n            }\n            readTimeInMinutes\n            publishedAt\n            brief\n            content {\n              markdown\n              html\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.FetchPostByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FetchAllPosts {\n  user(username: \"mblessed\") {\n    publications(first: 1) {\n      edges {\n        node {\n          posts(first: 0) {\n            edges {\n              node {\n                id\n                title\n                slug\n                subtitle\n                tags {\n                  id\n                  name\n                }\n                url\n                coverImage {\n                  url\n                }\n                readTimeInMinutes\n                publishedAt\n                brief\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query FetchAllPosts {\n  user(username: \"mblessed\") {\n    publications(first: 1) {\n      edges {\n        node {\n          posts(first: 0) {\n            edges {\n              node {\n                id\n                title\n                slug\n                subtitle\n                tags {\n                  id\n                  name\n                }\n                url\n                coverImage {\n                  url\n                }\n                readTimeInMinutes\n                publishedAt\n                brief\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FetchPostById($slug: String!) {\n  user(username: \"mblessed\") {\n    publications(first: 1) {\n      edges {\n        node {\n          post(slug: $slug) {\n            id\n            title\n            slug\n            subtitle\n            tags {\n              id\n              name\n            }\n            url\n            coverImage {\n              url\n            }\n            readTimeInMinutes\n            publishedAt\n            brief\n            content {\n              markdown\n              html\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query FetchPostById($slug: String!) {\n  user(username: \"mblessed\") {\n    publications(first: 1) {\n      edges {\n        node {\n          post(slug: $slug) {\n            id\n            title\n            slug\n            subtitle\n            tags {\n              id\n              name\n            }\n            url\n            coverImage {\n              url\n            }\n            readTimeInMinutes\n            publishedAt\n            brief\n            content {\n              markdown\n              html\n            }\n          }\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;