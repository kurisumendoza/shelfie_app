import { Client, Account, Avatars, Databases } from 'react-native-appwrite';

export const client = new Client()
  .setProject('6997f2ee002633b652f1')
  .setPlatform('dev.kurisu.shelfie')
  .setEndpoint('https://sgp.cloud.appwrite.io/v1');

export const account = new Account(client);
export const avatars = new Avatars(client);
export const database = new Databases(client);
