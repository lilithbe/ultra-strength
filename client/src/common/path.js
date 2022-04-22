export const mainsite=process.env.REACT_APP_MAIN_SITE_DOMAIN
export const apiUrl=process.env.REACT_APP_API_URL

const post=`${apiUrl}/post`
const auth=`${apiUrl}/auth`
const product=`${apiUrl}/product`
const request = `${apiUrl}/request`

// --------------------------------------------------------------------
export const POST_CATEGORY_CREATE=`${post}/category/create`
export const POST_CATEGORY_DELETE=`${post}/category/delete`
export const POST_CATEGORY_UPDATE=`${post}/category/update`


export const POST_CREATE=`${post}/create`
export const POST_UPDATE=`${post}/update`
export const POST_DELETE=`${post}/delete`
export const POST_GET_LIST_ALL=`${post}/get-all`
export const POST_GET_LIST_CATEGORY=`${post}/get-category`
export const POST_GET_LIST_SEARCH=`${post}/get-search`
export const POST_GET_ONE=`${post}/get-one`
export const POST_GET_MY_POST=`${post}/get-my-post`


export const POST_COMMENT_CREATE=`${post}/comment/create`
export const POST_COMMENT_UPDATE=`${post}/comment/update`
export const POST_COMMENT_DELETE=`${post}/comment/delete`
export const POST_COMMENT_LIST=`${post}/comment/list`
// --------------------------------------------------------------------
export const AUTH_SIGNUP=`${auth}/signup`
export const AUTH_SIGNIN=`${auth}/signin`
export const AUTH_SET_PROFILE=`${auth}/set-profile`
export const AUTH_GET_PROFILE=`${auth}/get-profile`
export const AUTH_ID_CHECK=`${auth}/id-check`
export const AUTH_TOKEN_CHECK = `${auth}/token-check`
export const AUTH_GET_USER_INFO=`${auth}/get-user-info`


// --------------------------------------------------------------------
export const PRODUCT_CATEGORY_CREATE=`${product}/category/create`
export const PRODUCT_CATEGORY_UPDATE=`${product}/category/update`
export const PRODUCT_CATEGORY_DELETE=`${product}/category/delete`
export const PRODUCT_CATEGORY_LIST=`${product}/category/list`

export const PRODUCT_CREATE=`${product}/create`
export const PRODUCT_DELETE=`${product}/delete`
export const PRODUCT_UPDATE=`${product}/update`
export const PRODUCT_ALLUPDATE=`${product}/allupdate`
export const PRODUCT_GET_PRODUCT=`${product}/get-product`
export const PRODUCT_LIST_ALL=`${product}/list/all`
export const PRODUCT_LIST_CATEGORY=`${product}/list/category`
export const PRODUCT_GET_ITEM=`${product}/getitem`

export const PRODUCT_IMAGE_UPLOAD = `${product}/image/upload`
export const PRODUCT_IMAGE_DELETE = `${product}/image/delete`

export const PRODUCT_INFO_IMAGE_UPLOAD=`${product}/info/image-upload`

export const PRODUCT_MYCARTLIST=`${product}/mycartlist`

export const PRODUCT_ROTATE_CREATE=`${product}/rotate-create`


// --------------------------------------------------------------------
export const REQUEST_CREATE=`${request}/create`
export const REQUEST_MY_LIST=`${request}/my-list`