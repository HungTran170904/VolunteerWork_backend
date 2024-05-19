import AuthError from '../Errors/AuthError.js'
import Organization from '../Models/Organization.js'
import { ORGANIZATION } from '../Utils/Constraints.js'

const OrgMiddleware = async (req, res, next) => {
	try {
		var account = req.account
		if (account.role != ORGANIZATION)
			throw new AuthError('This endpoint is only for organizations')
		var org = await Organization.findOne({ account: account._id })
		if (!org)
			throw new AuthError(
				'Organization with accountId ' + account._id + ' does not exist'
			)
		req.org = org
		req.org.account = account
		next()
	} catch (error) {
		next(error)
	}
}
export default OrgMiddleware
