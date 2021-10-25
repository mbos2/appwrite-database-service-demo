import { DATABASE } from '$lib/service/appwrite/appwrite.config';

export const NODE_API = {
	getCollection(collectionId: string) {
		return DATABASE.getCollection(collectionId);
	},
	createCollection(name: string, read: string[], write: string[], rules: string[]) {
		return DATABASE.createCollection(name, read, write, rules);
	},
	updateCollection(collectionId: string) {
		return true;
	},
	deleteCollection(collectionId: string) {
		return DATABASE.deleteCollection(collectionId);
	},
	createDocument(
		collectionId: string,
		data: JSON,
		read?: string[],
		write?: string[],
		parentDocumentId?: string,
		parentPropertyName?: string,
		parentPropertyType?: string
	) {
		return DATABASE.createDocument(
			collectionId,
			data,
			read,
			write,
			parentDocumentId,
			parentPropertyName,
			parentPropertyType
		);
	},
	deleteDocument(collectionId: string, documentId: string) {
		return DATABASE.deleteDocument(collectionId, documentId);
	}
};
