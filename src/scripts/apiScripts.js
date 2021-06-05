import { ContactsOutlined } from "@material-ui/icons";

const BACK_HOST_NAME = "http://rbgs.xyz/";

const doFetch = async (queryString, methodValue, params) => {
  return fetch(BACK_HOST_NAME + queryString, {
    method: methodValue,
    headers: {
      "Content-Type": "application/json",
    },
    body: params ? JSON.stringify(params) : null,
  })
    .then((response) => {
      if (response.status !== 200) {
        return false;
      } else {
        return response.json();
      }
    })
    .then((responseData) => {
      if (!responseData) {
        return {};
      } else {
        return responseData;
      }
    });
};

/**
 * Creates a new user
 * @param {String} email
 * @param {String} type "user" | "admin"
 * @returns Promise
 */
export const createUser = async (email, type) => {
  const queryString = `api/users`;
  const methodValue = "POST";
  const params = { email: email, type: type };
  return await doFetch(queryString, methodValue, params);
};

/**
 * Deletes user with given id
 * @param {String} id
 * @returns Promise
 */
export const deleteUser = async (id) => {
  const queryString = `api/users/${id}`;
  const methodValue = "DELETE";
  const params = null;
  return await doFetch(queryString, methodValue, params);
};

/**
 * Returns a user given an email
 * @param {String} email
 * @returns Object
 */
export const getUserTypeByEmail = async (email) => {
  const queryString = `api/users/${email}`;
  const methodValue = "GET";
  const params = null;
  return await doFetch(queryString, methodValue, params);
};

/**
 * Returns all users
 * @returns Array
 */
export const getAllUsers = async () => {
  const queryString = "api/users";
  const methodValue = "GET";
  const params = null;
  return await doFetch(queryString, methodValue, params);
};

/**
 * Creates a new link
 * @param {String} url
 * @param {String} short_url
 * @param {String} title
 * @param {Number} priv Defines if a link is private - 0 | 1
 * @param {String} image
 * @param {Array} tags "@home" | "candidates" | "contests" | "covid" | "docs" | "drones" | "electronics" | "github" | "larcOpen" | "mechanics" | "presentation" | "programming" | "robocup" | "sideProjects" | "social" | "sponsors" | "vsss" | "youtube" | "workshop"
 * @returns
 */
export const createLink = async (url, short_url, title, priv, image, tags) => {
  const queryString = "api/links";
  const methodValue = "POST";
  const params = {
    url: url,
    short_url: short_url,
    title: title,
    private: priv,
    image: image,
    tags: tags,
  };
  //console.log(params);
  return doFetch(queryString, methodValue, params);

  return await doFetch(queryString, methodValue, params);
};

/**
 * Deletes a link with the provided ID
 * @param {String} id
 * @returns Promise
 */
export const deleteLink = async (id) => {
  const queryString = `api/links/${id}`;
  const methodValue = "DELETE";
  const params = null;
  return doFetch(queryString, methodValue, params);
};

/**
 * Updates a link with the provided ID
 *
 * In case you want to update the tags section of a link, you need to provide the key and the value 1. For example "docs": 1, inside the tags property.
 *
 * An example of how tags should be structured:
 * [ "@home", "mechanics" ]
 *
 * @param {String} id
 * @param {Object} params
 * @param {String} params.url
 * @param {String} params.short_url
 * @param {String} params.title
 * @param {Number} params.private 0 | 1
 * @param {String} params.image
 * @param {Array} params.tags
 * @param {String} params.tags.tagName
 * @returns Promise
 */
export const updateLink = async (id, params) => {
  const queryString = `api/links/${id}`;
  const methodValue = "PATCH";
  return doFetch(queryString, methodValue, params);
};

/**
 * Returns all links with optional parameters
 *
 * Filters and tags are optional
 * @param {Object} filters
 * @param {String} filters.url
 * @param {String} filters.short_url
 * @param {String} filters.title
 * @param {Array} tags
 * @returns
 */
export const getAllLinks = async (filters, tags) => {
  let queryString = "api/links";
  let filterParams = "?";
  let tagParams = "";

  if (filters) {
    Object.keys(filters).forEach((key) => {
      filterParams = filterParams + `${key}=${filters[key]}&`;
    });
    queryString = queryString + filterParams;
  }

  if (tags) {
    queryString = queryString + "tags=";
    tags.forEach((tag) => {
      tagParams = tagParams + `${tag},`;
    });
    tagParams = tagParams.slice(0, tagParams.length - 1);
    queryString = queryString + tagParams;
  }

  const methodValue = "GET";
  const params = null;
  return await doFetch(queryString, methodValue, params);
};

/**
 * Returns link with given id
 * @param {String} id
 * @returns Object
 */
export const getLinkById = async (id) => {
  const queryString = `api/links/${id}`;
  const methodValue = "GET";
  const params = null;
  return await doFetch(queryString, methodValue, params);
};

/**
 * Redirect to real url and increment 1 to "contador"
 * @param {String} url
 * @returns Redirect
 */
export const redirectToUrl = async (url) => {
  const queryString = url;
  const methodValue = "GET";
  const params = null;
  return await doFetch(queryString, methodValue, params);
};
