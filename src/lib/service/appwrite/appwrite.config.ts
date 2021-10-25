import { Appwrite as Appwrite_WEB } from 'appwrite';
import { Client as Appwrite_NODE, Database } from 'node-appwrite';

const APPWRITE_ENDPOINT = 'http://localhost/v1';
const APPWRITE_PROJECT_ID = '616e9e0e397f3';
const APPWRITE_API_KEY =
	'018f19a738ace0723c7696fa35682d4e43ef0ef9976055cea5b2c85695fb90f7f4ac4c60d686833c2fdc4b21aac929b0277321e3fc155c83201e7858dccc064bf02d33e25038ee9d9aef787a71e1bb20a12e96f8a3dc734e2ec3475144cec319d462114af794648e9b22aead1bfd44fb9371c8744445e93ccfc9a59015c8c1fb';

const CLIENT_WEB = new Appwrite_WEB();
const CLIENT_NODE = new Appwrite_NODE();
const DATABASE = new Database(CLIENT_NODE);

CLIENT_WEB.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
CLIENT_NODE.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID).setKey(APPWRITE_API_KEY);

export { CLIENT_WEB, CLIENT_NODE, DATABASE };
