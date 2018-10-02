const checkSession  = (session) => {
	return session.userId || false;
}

module.exports.adminTypeDefs = adminTypeDefs = `
  type Query {
    getItem: String
  } 
  type Mutation {
    adminLogIn(login: String, password: String): Boolean
    logOutMutation: Boolean
  }
  
  type Test {
  	test: Boolean
  }
`;

module.exports.rootAdmin = rootAdmin = {
	Query: {
		getItem: (obj, arg, {session}) => {
			if(!checkSession(session)) {
				return 'unauthorized';
			}
			return 'swfewfwe';
		}
	},
	Mutation: {
		adminLogIn: (obj, arg, { session }) => {
			console.log(arg.login, arg.password);
			if (arg.login === "admin" && arg.password === "admin") {
				session.userId = 777;
				return true;
			} else {
				return false;
			}
		},
		logOutMutation: (obj, arg, req) => {
			req.session.destroy();
			return true;
		},
	}
};
