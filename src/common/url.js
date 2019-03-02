const host = "http://47.106.176.136:8080"
export default url = {
	getRandBookList: host + "/v1/getRandBookList",
	getBookList: host + "/v1/getBookList",
	getBookInfo: host + "/v1/getBookInfo",
	register: host + "/v1/register",
	login: host + "/v1/login",
	getDirectory: host + "/v2/getDirectory",
	getPage: host + "/v2/getPage",
	getNextPage: host + "/v2/getNextPage",
	addBook: host + "/v2/addBook",
	delBook: host + "/v2/delBook",
	getSelfBook: host + "/v2/getSelfBook",
	search: host + "/v1/search"
}