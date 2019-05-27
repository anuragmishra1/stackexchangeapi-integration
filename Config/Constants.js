'use strict';

const swaggerDefaultResponseMessages = [
	{ code: 200, message: 'OK' },
	{ code: 400, message: 'Bad Request' },
	{ code: 401, message: 'Unauthorized' },
	{ code: 404, message: 'Data Not Found' },
	{ code: 500, message: 'Internal Server Error' }
];

const STATUS_MSG = {
	ERROR: {
		INVALID_USER_PASS: {
			statusCode: 401,
			type: 'INVALID_USER_PASS',
			customMessage: 'Invalid username or password'
		},
		SOCIAL_LOGIN_FAILED: {
			statusCode: 401,
			type: 'SOCIAL_LOGIN_FAILED',
			customMessage: 'Login Failed! Please try again.'
		},
		INCORRECT_PASSWORD: {
			statusCode: 401,
			customMessage: 'Incorrect Password',
			type: 'INCORRECT_PASSWORD'
		},
		ACCESS_DENIED: {
			statusCode: 401,
			customMessage: 'You do not have permission for this API',
			type: 'ACCESS_DENIED'
		},
		DUPLICATE: {
			statusCode: 400,
			customMessage: 'Duplicate Entry',
			type: 'DUPLICATE'
		},
		DB_ERROR: {
			statusCode: 400,
			customMessage: 'DB Error',
			type: 'DB_ERROR'
		},
		INVALID_ID: {
			statusCode: 400,
			customMessage: 'Invalid Id Provided : ',
			type: 'INVALID_ID'
		},
		APP_ERROR: {
			statusCode: 400,
			customMessage: 'Application Error',
			type: 'APP_ERROR'
		},
		IMP_ERROR: {
			statusCode: 500,
			customMessage: 'Implementation Error',
			type: 'IMP_ERROR'
		},
		INVALID_TOKEN: {
			statusCode: 401,
			customMessage: 'Invalid token provided',
			type: 'INVALID_TOKEN'
		},
		EMAIL_NOT_VERIFIED: {
			statusCode: 401,
			customMessage: 'Your Email address is not verified.',
			type: 'EMAIL_NOT_VERIFIED'
		},
		EMAIL_NOT_EXIST: {
			statusCode: 400,
			customMessage: 'Email address does not exist.',
			type: 'EMAIL_NOT_EXIST'
		},
		ROLE_NOT_EXIST: {
			statusCode: 400,
			customMessage: 'Role does not exist',
			type: 'ROLE_NOT_EXIST'
		},
		TOKEN_NOT_VERIFIED: {
			statusCode: 400,
			customMessage: 'Token is not verified.',
			type: 'TOKEN_NOT_VERIFIED'
		},
		PASSWORD_NOT_MATCHED: {
			statusCode: 400,
			customMessage: 'Password and Confirm Password are not same.',
			type: 'PASSWORD_NOT_MATCHED'
		},
		OLD_AND_NEW_PASSWORD_SHOULD_NOT_SAME: {
			statusCode: 400,
			customMessage: 'Old Password and New Password should not same.',
			type: 'OLD_AND_NEW_PASSWORD_SHOULD_NOT_SAME'
		}
	},
	SUCCESS: {
		CREATED: {
			statusCode: 201,
			customMessage: 'Created Successfully',
			type: 'CREATED'
		},
		DEFAULT: {
			statusCode: 200,
			customMessage: 'Success',
			type: 'DEFAULT'
		},
		UPDATED: {
			statusCode: 200,
			customMessage: 'Updated Successfully',
			type: 'UPDATED'
		},
		LOGOUT: {
			statusCode: 200,
			customMessage: 'Logged Out Successfully',
			type: 'LOGOUT'
		},
		DELETED: {
			statusCode: 200,
			customMessage: 'Deleted Successfully',
			type: 'DELETED'
		},
		FORGOT_PASSWORD_MAIL_SENT: {
			statusCode: 200,
			customMessage: 'Forgot password request initiated, check your mail.',
			type: 'MAIL_SENT'
		},
		PASSWORD_CHANGED: {
			statusCode: 200,
			customMessage: 'Password Updated Successfully.',
			type: 'PASSWORD_CHANGED'
		},
		AUTHENTICATED: {
			statusCode: 200,
			customMessage: 'User is authenticated',
			type: 'AUTHENTICATED'
		}
	}
};

const Constants = {
	SERVER,
	STATUS_MSG,
	swaggerDefaultResponseMessages,
	notificationMessages,
	hashingSecret,
	defaultDistanceForRestaurantSearch,
	userRoles,
	serverUser
};

module.exports = Constants;
