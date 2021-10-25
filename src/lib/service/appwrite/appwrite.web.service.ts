/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CLIENT_WEB } from '$lib/service/appwrite/appwrite.config';

export const WEB_API = {
	getCollectionDocuments(
		collectionId: string,
		filters?: string[],
		limit?: number,
		offset?: number,
		orderField?: string,
		orderType?: string,
		orderCast?: string,
		search?: string
	) {
		return CLIENT_WEB.database.listDocuments(
			collectionId,
			filters,
			limit,
			offset,
			orderField,
			orderType,
			orderCast,
			search
		);
	}
};
